const { club } = require('../models/')
const team = require('./team')
const venue = require('./venue')

const aggregate = async data=>{
    console.log("getting teams")
    data.teams = await team.getTeams({club:data._id})
    // data.venues = await venue.getVenues({club:data._id})
    return data
}

module.exports = {
    getClubs: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        return club
            .find(criteria)
            .populate({ path: 'organisation' })
            // .then(aggregate)
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting clubs"}))
    },

    getClub: (id)=>(
        club
            .findById(id)
            .populate({ path: 'organisation' })
            .populate({ path: 'venue' })
            // .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),
    
    findClub: (criteria={})=>(
        club
            .findOne(criteria)
            .populate({ path: 'organisation' })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),


    // TRYING ASYNC/AWAIT AND PROMISES TO SEE WHICH WORKS BEST

    updateClub: async (id, data)=>{
        let Club = await club
            .findByIdAndUpdate(id, { $set: data}, { new: false })
        
        if(!Club) return {error:true, message:"Couldn't update club"}
        else return Club
    },

    replaceClub: async (data)=>{        
        let Club = await club
            .findByIdAndUpdate(id, { $set: data}, { new: true })

        if(!Club) return {error:true, message:"Couldn't update club"}
        else return Club
    },


    newClub: ({title,title_short,primary_color, secondary_color, organisation, crest})=>(
        new club({
                    title, 
                    title_short, 
                    primary_color, 
                    secondary_color, 
                    crest, 
                    organisation,
                })
                .save()
                .then(result=>result)
                .catch(err=>console.log({error:true, message:"Error creating club"}))
    ),


}