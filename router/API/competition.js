const express = require('express');
const router = express.Router();
const { Authenticate, isLeagueSecretary } = require('../../auth/passport');
const {competition, league, division} = require('../../database/controllers/');

const getCompetitions = (req, res, next)=>{
    competition
        .getCompetitions(req.query || {})
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const getCompetition = (req, res, next)=>{
    competition 
        .getCompetition(req.params.id)
        .then(data=> res.status(200).json(data) )
        .catch(next)    
}

const newCompetition = (req, res, next)=>{
    competition
        .newCompetition(req.body)
        .then(response=>{
            res.status(200).json(response)
        })
        .catch(next)    
}

const replaceCompetition = (req, res, next)=>{
    res.redirect('/')
}

const updateCompetition = (req, res, next)=>{
    res.redirect('/')
}

const deleteCompetition = (req, res, next)=>{
    res.redirect('/')
}

router.use((req, res, next)=>{
    console.log("Competition route middleware stub")
    next()
})

router.get('/', getCompetitions);
router.get('/:id', getCompetition);
router.post('/', Authenticate, isLeagueSecretary, newCompetition);
router.put('/:id', Authenticate, isLeagueSecretary, replaceCompetition);
router.patch('/:id', Authenticate, isLeagueSecretary, updateCompetition);
router.delete('/:id', Authenticate, isLeagueSecretary, deleteCompetition);

module.exports = router;