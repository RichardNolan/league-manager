const mongoose = require('../database');
const { time_slot } = require('../models/')

module.exports = {
    findTime_slot: (criteria={})=>(
        time_slot
            .find(criteria)
            .then(res=>{
                return res
            })
            .catch(err=>console.log({error:true, message:err}))
    
        ),

    getTime_slot: (id)=>(
        time_slot
            .findById(id)
            .then(res=>{
                return res
            })
            .catch(err=>console.log({error:true, message:err}))
    
        ),
}