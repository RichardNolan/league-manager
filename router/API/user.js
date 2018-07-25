const express = require('express');
const router = express.Router();
const { Authenticate, isLeagueSecretary, isMe } = require('../../auth/passport');

const {user} = require('../../database/controllers/');


const getUsers = (req, res)=>{
    console.log("got to API")
    user
        .getUsers(req.query || {})
        .then(users=>res.status(200).json(users))
        .catch(err=>console.log(err))

}
const getUser = (req, res, next)=>{
    user
        .getUser(req.params.id)
        .then(users=>res.status(200).json(users))
        .catch(next)
}

const updateUser = (req, res, next)=>{
    user
        .updateUser(req.params.id, req.body.user)
        // .then(data=>res.status(200).json(data))
        // .catch(next)   
}


const replaceUser = (req, res, next)=>{
    res.redirect('/')
}


const deleteUser = (req, res, next)=>{
    user
        .deleteUser(req.params.id)
        .then(result=>{
            // console.log(result)
            res.status(200).json(result)
        })
        .catch(next)
}

const setTeam = (req, res, next)=>{
    user
        .updateUser(req.user._id, {team:req.query.team})
        .then(data=>res.status(200).json(data))
        .catch(next)   
}


router.use((req,res,next)=>{
    console.log("User route middleware stub")
    next()
})



router.get('/', Authenticate, isLeagueSecretary, getUsers);
router.get('/:id', Authenticate, isMe, getUser);
router.get('/setteam', Authenticate, isMe, setTeam);

router.put('/:id', Authenticate, isMe, updateUser);
router.patch('/:id', Authenticate, isMe, replaceUser);

//TO DO
router.delete('/:id', Authenticate, isMe, deleteUser);

router.use((req, res, next)=>{
    res.json({});
})
module.exports = router;


