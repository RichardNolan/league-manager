const { team, table, fixture } = require('../models/')
    
module.exports = {
    getTeams: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        if(criteria.division==='null') criteria.division=null
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
            .then(getTable)
            .then(getNextFixture)
            .then(getLastResult)
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

    updateTeams: (criteria, newValue)=>{
        return team
            .where(criteria)
            .setOptions({ multi: true, overwrite: true })
            .update({ $set: newValue})
            .exec()
    },

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

const getTable = async team=>{
    let division = null
    if(team.division && typeof team.division==='string') division = team.division
    else if(team.division && typeof team.division==='object') division = team.division._id
    if(division){
        return await table.findOne({division})
            .then(table=>{
                team.table = table
                return team
            })
            .catch(err=>console.log(err))
    }else{
        return team
    }
}

const getNextFixture = async team=>{
    return await fixture
        .findOne()
        .where('date')
        .gt(Date.now())
        .sort({date:1})
        .or([{home_team:team._id}, {away_team:team._id}])
        .populate({ path: 'home_team', populate:{path:'club', select:'venue title_short'} })
        .populate({ path: 'away_team', populate:{path:'club', select:'title_short'} })
        .then(data=>{
            team.nextFixture = data
            return team
        })
        .catch(err=>{
            console.log(err)
            return team
        })
}

const getLastResult = async team=>{
    return await fixture
        .findOne()
        .where('date')
        .lt(Date.now())
        .where('score_home')
        .ne(null)
        .where('score_away')
        .ne(null)
        .sort({date:-1})
        .or([{home_team:team._id}, {away_team:team._id}])
        .populate({ path: 'home_team', populate:{path:'club', select:'venue title_short'} })
        .populate({ path: 'away_team', populate:{path:'club', select:'title_short'} })
        .then(data=>{
            team.lastResult = data
            return team
        })
        .catch(err=>{
            console.log(err)
            return team
        })
}