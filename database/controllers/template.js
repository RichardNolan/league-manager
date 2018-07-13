const { template } = require('../models/')
const team = require('./team')
const venue = require('./venue')

const aggregate = async data=>{
    data.teams = await team.getTeams({template:data._id})
    data.venues = await venue.getVenues({template:data._id})
    return data
}

// populate will prevent a circular reference of parent, and return 
// children are populated using aggregator above


module.exports = {
    getTemplates: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        return template
            .find(criteria)
            .populate({ path: 'organisation' })
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting templates"}))
    },

    getTemplate: (id)=>(
        template
            .findById(id)
            .populate({ path: 'organisation' })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),
    
    findTemplate: (criteria={})=>(
        template
            .findOne(criteria)
            .populate({ path: 'organisation' })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),

    updateTemplate: async (id, data)=>{
        let Template = await template
            .findByIdAndUpdate(id, { $set: data}, { new: false })
        
        if(!Template) return {error:true, message:"Couldn't update template"}
        else return Template
    },

    replaceTemplate: async (data)=>{        
        let Template = await template
            .findByIdAndUpdate(id, { $set: data}, { new: true })

        if(!Template) return {error:true, message:"Couldn't update template"}
        else return Template
    },


    newTemplate: async ({title, organisation, venue, user})=>(
        new template({
                    title, 
                    organisation,
                    venue,
                })
                .save()
                .then(result=>result)
                .catch(err=>console.log({error:true, message:"Error creating template"}))
    ),


}






// UPDATE METHODS
       
// METHOD 1
            // OBJECT RETRIEVED MODIFIED AND SAVED
            // Tank.findById(id, function (err, tank) {
            //     if (err) return handleError(err);
              
            //     tank.size = 'large';
            //     tank.save(function (err, updatedTank) {
            //       if (err) return handleError(err);
            //       res.send(updatedTank);
            //     });
            //   });

// METHOD 2
            //NO OBJECT RETURNED
            // Tank.update({ _id: id }, { $set: { size: 'large' }}, callback);

// METHOD 3
            // IF WE NEED OBJECT - CREATES A NEW OBJECT WITH FLAG
            // Tank.findByIdAndUpdate(id, { $set: { size: 'large' }}, { new: true }, function (err, tank) {
            //     if (err) return handleError(err);
            //     res.send(tank);
            //   });