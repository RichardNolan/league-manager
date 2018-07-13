const { referee } = require('../models/')
const team = require('./team')
const venue = require('./venue')

const aggregate = async data=>{
    // data.teams = await team.getTeams({referee:data._id})
    // data.venues = await venue.getVenues({referee:data._id})
    console.log("REf")
    return data
}

module.exports = {
    getReferees: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        return referee
            .find(criteria)
            .populate({ path: 'organisation' })
            .populate({ path: 'user' })
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting referees"}))
    },

    getReferee: (id)=>(
        referee
            .findById(id)
            .populate({ path: 'organisation' })
            .populate({ path: 'user' })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),
    
    findReferee: (criteria={})=>(
        referee
            .findOne(criteria)
            .populate({ path: 'organisation' })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),

    updateReferee: async (id, data)=>{
        let Referee = await referee
            .findByIdAndUpdate(id, { $set: data}, { new: false })
        
        if(!Referee) return {error:true, message:"Couldn't update referee"}
        else return Referee
    },

    replaceReferee: async (data)=>{        
        let Referee = await referee
            .findByIdAndUpdate(id, { $set: data}, { new: true })

        if(!Referee) return {error:true, message:"Couldn't update referee"}
        else return Referee
    },


    newReferee: async ({organisation, user})=>(
        new referee({
                    user, 
                    organisation,
                })
                .save()
                .then(result=>result)
                .catch(err=>console.log({error:true, message:err}))
    ),


}