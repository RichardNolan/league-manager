const { league } = require('../models/')
const division = require('./division')
const {team, table} = require('../models')

const aggregate =  async data=>{
    // console.log("=================== AGG LEAGUE")
    // console.log(data)
    // console.log("===================")
    data.divisions = await division.getDivisions({league:data._id})
    return data
}
    
module.exports = {
    getLeagues: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        return league.find(criteria)
            .populate({path: 'divisions'})
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting leagues"}))
    },

    getLeague: (id)=>(
        league.findById(id)
            // .populate({path: 'divisions'})
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),

    findLeague: (criteria)=>(
        league.findOne(criteria)
            // .populate({path: 'divisions'})
            // .then(l=>{
            //     console.log('================== L')
            //     console.log(l, criteria)
            //     return l
            // })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),

    newDivisions: (body)=>{
        // THIS STRICTLY SPEAKING ISN'T WORKING ON THE LEAGUE MODEL AT ALL BUT RATHER THE DIVISIONS AND TEAMS IN IT
       
       let promiseArray = []
        Object.keys(body.divisions).filter(d=>typeof body.divisions[d]==='object').forEach(d=>{
            let rank = 0
                promiseArray.push(
                    division.newDivision({
                        rank:rank++, 
                        title:d, 
                        league:body.league
                    })
                    .then(result=>{
                        let division = result._id
                        body.divisions[d].forEach(t=>{
                            team.findByIdAndUpdate(t._id, {division}, (err,res)=>{
                                if(err) console.log(err)
                                else console.log(res)
                            })
                            console.log("====== CREATE TABLE ", {team:t._id, division})
                            // new table({team:t._id, division})
                            //     .save()
                            //     .then(result=>result)
                            //     .catch(err=>console.log({error:true, message:"Error creating table entry"}))
                        })
                        return result
                    })
                    .catch(err=>console.log(err))
                
                )
            
        })
        return Promise.all(promiseArray).then(result=>result)
    },

    newLeague: (body)=>(
        new league(body)
                .save()
                .then(result=>result)
                .catch(err=>console.error(err))
    ),

}