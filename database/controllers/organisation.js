const { organisation } = require('../models/')
const club = require('./club')
const competition = require('./competition')
const referee = require('./referee')
const user = require('./user')

const aggregate = async data=>{
    data.clubs = await club.getClubs({organisation:data._id})
    data.competitions = await competition.getCompetitions({organisation:data._id})
    data.referees = await referee.getReferees({organisation:data._id})
    // data.users = await user.getUsers({organisation:data._id})
    return data
}

module.exports = {
    getOrganisations: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        return organisation
            .find(criteria)
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting organisations"}))
    },

    getOrganisation: (id)=>(      
        organisation
            .findById(id)
            .then(aggregate)
            .catch(err=>{
                console.log({error:true, message:err})
            })
        ),

    findOrganisation: (criteria={})=>(
        organisation
            .findOne(criteria)
            .then(aggregate)
            .catch(err=>console.log({error:true, message:"Error getting organisations"}))
    ),

    newOrganisation: async ({title})=>(
        new organisation({
                    title, 
                })
                .save()
                .then(result=>result)
                .catch(err=>console.log({error:true, message:"Error creating organisation"}))
    ),

}