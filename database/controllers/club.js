const { club } = require('../models/')
const team = require('./team')
const venue = require('./venue')

const aggregate = async data=>{
    data.teams = await team.getTeams({club:data._id})
    data.venues = await venue.getVenues({club:data._id})
    return data
}

module.exports = {
    getClubs: (criteria={})=>(
        club
            .find(criteria)
            .populate({ path: 'organisation' })
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting clubs"}))
    ),

    getClub: (id)=>(
        club
            .findById(id)
            .populate({ path: 'organisation' })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),
    
    findClub: (criteria={})=>(
        club
            .findOne(criteria)
            .populate({ path: 'organisation' })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),


    // TRYING ASYNC/AWAIT AND PROMISES TO SEE WHICH WORKS

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


    newClub: async ({title,title_short,primary_color, secondary_color, organisation, venue})=>(
        //CHECK IF USER IS ADMIN
        new club({
                    title, 
                    title_short, 
                    primary_color, 
                    secondary_color,  
                    organisation,
                    venue,
                })
                .save()
                .then(result=>result)
                .catch(err=>console.log({error:true, message:"Error creating club"}))
    ),


}