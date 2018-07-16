const mongoose = require('../database');
const {score} = require('../models')
module.exports = {
    addScore: (body)=>(
        new score(body)
            .save()
            .catch(err=>console.log(err))
    ),

    // MOVE TO FIXTURE CONTROLLER

//     upsertScore: (body)=>(
//         score
//             .findOneAndUpdate({fixture:body.fixture}, body, {upsert:true, new:true})
//             .then(result=>{
//                 return result
//             })
//             .catch(err=>console.log(err))
//         )
}