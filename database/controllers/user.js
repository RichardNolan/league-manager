const { user } = require('../models/')
const {createToken} = require('../../auth/authorisation');
var bcrypt = require('bcryptjs');

    
module.exports = {

    getUsers: (criteria={})=>(
        user
            .find(criteria)
            .then(data=>{
                // TO-DO EASY STRIP THE PASSWORD OFF EVERY USER IN DATA
                console.log(data)
                delete data.password
                return data
            })
            .catch(err=>console.log({error:true, message:"Error getting divisions"}))
    ),

    getUser: (id)=>(
        user
            .findById(id)
            .populate({ path: 'team' })
            .populate({ path: 'club' })
            .populate({ path: 'organisation' })
            .then(data=>{
                data.password = ""
                return data
            })
            .catch(err=>console.log({error:true, message:err}))
    ),
    
    getUsersByClub: (club)=>(
        user
            .find({club})
            .then(data=>data)
            .catch(err=>console.log({error:true, message:err}))
    ),
    updateUser: (id, newUser)=>{
        delete newUser.password
        return user   
            .findByIdAndUpdate(id, newUser,{new:true})
            .then(data=> data)
            .catch(err=>console.log({error:true, message:err}))
    },
    deleteUser: (id)=>(
        user
            .findByIdAndRemove(id)
            // .catch(result=>)
    ),
}