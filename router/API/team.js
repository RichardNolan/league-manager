const express = require('express');
const router = express.Router();
const { Authenticate, isAdmin, isClubOfficial } = require('../../auth/passport');
const {team} = require('../../database/controllers/');

const getTeams = (req, res, next)=>{
    team
        .getTeams(req.query || {})
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const getTeam = (req, res, next)=>{
    team
        .getTeam(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const newTeam = (req, res, next)=>{
    team
        .newTeam(req.body)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const replaceTeam = (req, res, next)=>{
    res.redirect('/')
}

const updateTeam = (req, res, next)=>{
    res.redirect('/')
}

const deleteTeam = (req, res, next)=>{
    res.redirect('/')
}


router.use((req,res,next)=>{
    console.log("Team route middleware stub")
    next()
})

router.get('/', getTeams);
router.get('/:id', getTeam);

router.post('/', Authenticate, isClubOfficial, newTeam);
router.put('/:id', Authenticate, isClubOfficial, replaceTeam);
router.patch('/:id', Authenticate, isClubOfficial, updateTeam);
router.delete('/:id', Authenticate, isClubOfficial, deleteTeam);

module.exports = router;