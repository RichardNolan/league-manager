const { competition } = require('../models/')
const league = require('./league')

const aggregate = async data=>{
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

}
