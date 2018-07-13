const { team } = require('../models/')
const { table } = require('../models/')
    
module.exports = {
    getTeams: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        return team
            .find(criteria)
            .skip(parseInt(skip) || 0)
            .limit(parseInt(limit) || 200)
            // .populate({ path: 'division' })
            .populate({ path: 'club' })
            .then(data=>data)
            // .catch(err=>console.log({error:true, message:"Error getting teams"}))
            .catch(err=>console.error(err))
    },

    getTeam: (id)=>(
        team
            .findById(id)
            .populate({ path: 'club' })
            .populate({ path: 'division', populate:{path:'teams'}, populate:{path:'tables'} })
            .then(team=>{
                if(team.division){
                    return table.find({division:team.division._id})
                        .then(table=>{
                            team.table = table
                            return team
                        })
                        .catch(err=>console.log(err))
                }else{
                    return team
                }
            })
            .catch(err=>console.log({error:true, message:err}))
    ),

    findTeam: (criteria={})=>(
        team
            .findOne(criteria)
            .populate({ path: 'division' })
            .populate({ path: 'club' })
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting teams"}))
    ),

    newTeam: ({title, club, title_short, category, organisation})=>(
        new team({
                    title, 
                    club,
                    title_short,
                    category,
                    organisation,
                })
                .save()
                .then(result=>result)
                .catch(err=>console.log({error:true, message:"Error creating team"}))
    ),

}