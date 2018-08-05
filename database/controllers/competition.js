const { competition, table, division, fixture } = require('../models/')
const leagueModel = require('../models/league')
const league = require('./league')
const team = require('./team')

const aggregate = async data=>{
    // console.log("=================== AGG DATA")
    // console.log(data)
    // console.log("===================")
    if(data.type==="league"){ 
        data.league = await league.findLeague({competition:data._id}) 
        return data
    }else if(data.type==="cup"){ 
    }else if(data.type==="championship"){ 
    }
    return data
}

module.exports = {
    getCompetitions: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        return competition
            .find(criteria)
            .populate({ path: 'league' })
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting competitions"}))
    },

    getCompetition: (id)=>(
        competition
            .findById(id)
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),

    newCompetition: ({title, type, organisation, category})=>(
         new competition({
                    title, 
                    type,
                    organisation
                })
                .save()
                .then(response=>{
                    let newLeagueOrCup = {
                        competition : response._id,
                        title : response.title,
                        category:category,
                    }
                    if(response.type==='league') {
                        return league
                            .newLeague(newLeagueOrCup)
                            .then(new_league=>{
                                response.league = new_league
                                return({competition:response})                 
                            })
                            .catch(err=>console.error(err))
                    }else if(req.body.type==='cup'){
                
                    }else if(req.body.type==='championship'){
                
                    }else{
                        return(new_competition)
                    }
                })
                .catch(err=>console.error(err))
    ),

    deleteCompetition: (id)=>(
        competition
            .findById(id)
            .then(aggregate)
            .then(comp=>{
                // console.log("=================== FIND COMP")
                // console.log(comp)
                // console.log("===================")
                comp.league.divisions.forEach(div=>{
                                
                    table.deleteOne({division: div._id}, ()=>{
                        console.log("delete tables with division", div._id) 
                    })     

                                
                    fixture.deleteMany({division: div._id}, ()=>{
                        console.log("delete fixtures with division", div._id)
                    })              

                    console.log("findAndUpdate Teams with division", div._id) 
                    team.updateTeams({division: div._id}, {division:null})   
                })

                division.deleteMany({league: comp.league._id}, ()=>{
                    console.log("delete divisions from league", comp.league._id)
                }) 

                leagueModel.deleteOne({_id:comp.league._id}, ()=>{
                    console.log("delete league", comp.league._id)
                })
                // CUP DELETE WOULD BE TRIED TOO
                
                competition.deleteOne({_id:comp._id}, ()=>{
                    console.log("delete this competition", comp._id)
                })
                return comp
            })
            .catch(err=>console.log({error:true, message:err}))
        )

}
