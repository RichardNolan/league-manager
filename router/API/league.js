const express = require('express');
const router = express.Router();
const { Authenticate, isLeagueSecretary } = require('../../auth/passport');
const {league} = require('../../database/controllers/');


const getLeagues = (req, res, next)=>{
    league
        .getLeagues(req.query || {})
        .then(data=>res.status(200).json(data))
        .catch(next)    
}
const getLeague = (req, res, next)=>{
    league 
        .getLeague(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const newLeague = (req, res, next)=>{
    league 
        .newDivisions(req.body)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const replaceLeague = (req, res, next)=>{
    res.redirect('/')
}

const updateLeague = (req, res, next)=>{
    res.redirect('/')
}

const deleteLeague = (req, res, next)=>{
    res.redirect('/')
}

router.use((req, res, next)=>{
    console.log("League route middleware stub")
    next()
})

router.get('/',  getLeagues);
router.get('/:id',  getLeague);
router.post('/', Authenticate, isLeagueSecretary, newLeague);
router.put('/:id', Authenticate, isLeagueSecretary, replaceLeague);
router.patch('/:id', Authenticate, isLeagueSecretary, updateLeague);
router.delete('/:id', Authenticate, isLeagueSecretary, deleteLeague);

module.exports = router;