const { user } = require('../models/')
const {createToken} = require('../../auth/authorisation');
var bcrypt = require('bcryptjs');

    
module.exports = {
//    signin : ({email, password})=>(
//         user
//             .findOne({email})
//             .populate({ path: 'team' })
//             .populate({ path: 'club' })
//             .populate({ path: 'organisation' })
//             .then(data=>{
//                 if(!data) throw "Email address not found"
//                 return data
//             })
//             .then(data=> {
//                 if(bcrypt.compareSync(password, data.password)) return data 
//                 else throw "Incorrect password"
//             })
//             .then(data=>{
//                 data.password = ""
//                 return data
//             })
//             .then(data=>({
//                 success: true,
//                 user: data,
//                 token: createToken({
//                     payload: data,
//                     maxAge: 3600
//                 })
//             }))
//             .catch(err=>({error:true, message:err}))
//     ), 

    // signup: ({title, email, password1, password2, last_signed_in, is_admin, is_club_official, team, club})=>{
    //     if(password1===password2){ 
    //         let hashedPassword = bcrypt.hashSync(password1, 8);
    //         return new user({
    //                     title, 
    //                     email,
    //                     password:hashedPassword,
    //                     last_signed_in: Date.now(),
    //                     isAdmin,
    //                     isClubOfficial,
    //                     isLeagueSecretary,
    //                     isReferee,
    //                     isTeamManager,
    //                     isMember,
    //                     team,
    //                     club,
    //                 })
    //                 .save()
    //                 .then(result=>result)
    //                 .catch(err=>console.log({error:true, message:"Error getting users"}))
    //     }else{
    //         return {error:true, message:"Passwords didn't match"}
    //     }
    // },

    getUsers: (criteria={})=>(
        user
            .find(criteria)
            .then(data=>{
                // TO-DO EASY STRIP THE PASSWORD OFF EVERY USER IN DATA
                return data
            })
            .catch(err=>console.log({error:true, message:"Error getting divivions"}))
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
        user   
            .findByIdAndUpdate(id, newUser,{new:true})
            .then(data=> data)
            .catch(err=>console.log({error:true, message:err}))
    },
}