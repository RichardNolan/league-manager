const { table } = require('../models/')

const {sortTable} = require('../../methods/table')
    
module.exports = {
    getTables: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        return table
            .find(criteria)
            .populate({ path: 'team', populate:{ path: 'club' } })
            .populate({ path: 'division' })
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting tables"}))
    },

    getTable: (id)=>(
        table
            .findById(id)
            .populate({ path: 'team' })
            .populate({ path: 'division' })
            .then(data=>{
                data.table = sortTable(data.table)
                return data
            })
            .catch(err=>console.log({error:true, message:err}))
    ),

    findTable: (criteria={})=>(
        table
            .findOne(criteria)
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting tables"}))
    ),
    
    updateTable: (division_id, data)=>{
        table
            // .findByIdAndUpdate(id, { $set: data}, { new: false })
            //NOT SURE IF BELOW RETURNS A PROMISE OR NEEDS A CB -  I THINK CB
            .findOneAndUpdate({division:division_id}, { $set: { table: data }}, {new:false, upsert:true})
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting tables"}))
    },
    
    newTable: async (entry)=>(
        new table(entry)
                .save()
                .then(result=>result)
                .catch(err=>console.log({error:true, message:"Error creating organisation"}))
    ),

    
    deleteMany: (criteria)=>(
        table.
                deleteMany(criteria)
                // .then(next)
    ),

}