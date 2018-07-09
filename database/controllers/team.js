const { team } = require('../models/')

    
module.exports = {
    getTeams: (criteria={})=>(
        team
            .find(criteria)
            // .populate({ path: 'division' })
            .populate({ path: 'club' })
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting teams"}))
    ),

    getTeam: (id)=>(
        team
            .findById(id)
            .populate({ path: 'club' })
            .populate({ path: 'division' })
            .then(data=>data)
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

    newTeam: ({title, club, title_short, category})=>(
        new team({
                    title, 
                    club,
                    title_short,
                    category,
                })
                .save()
                .then(result=>result)
                .catch(err=>console.log({error:true, message:"Error creating team"}))
    ),

    // getTeamFixtures: (id)=>(
    //     team
    //         .findById(id)
    //         .then(async data=>{
    //             // data.fixtures = await fixture.getFixtures({$or:{home_team_id:id, away_team_id:id}}) //I THINK THATS RIGHT
    //             return data
    //         })
    //         .catch(err=>console.log({error:true, message:err}))
    // ),
}