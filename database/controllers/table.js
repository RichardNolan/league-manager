const { table } = require('../models/')

const {sortTable} = require('../../methods/table')
    
module.exports = {
    getTables: (criteria={})=>(
        table
            .find(criteria)
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting tables"}))
    ),

    getTable: (id)=>(
        table
            .findById(id)
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
    
    updateTable: (division_id, data)=>(
        table
            // .findByIdAndUpdate(id, { $set: data}, { new: false })
            //NOT SURE IF BELOW RETURNS A PROMISE OR NEEDS A CB -  I THINK CB
            .findOneAndUpdate({division:division_id}, { $set: { table: data }}, {new:false, upsert:true})
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting tables"}))
    ),
}