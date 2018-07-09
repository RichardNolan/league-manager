const express = require('express');
const router = express.Router();
const { Authenticate, isLeagueSecretary } = require('../../auth/passport');
const {referee} = require('../../database/controllers/');

const getReferees = (req,res, next)=>{
    referee
        .getReferees(req.query || {})
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const getReferee = (req,res, next)=>{
    referee
        .getReferee(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const newReferee = (req,res, next)=>{
    referee
        .newReferee(req.body)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const replaceReferee = (req,res, next)=>{
    res.redirect('/')
}

const updateReferee = (req,res, next)=>{
    res.redirect('/')
}

const deleteReferee = (req,res, next)=>{
    res.redirect('/')
}

router.use((req,res,next)=>{
    console.log("Referee route middleware stub")
    next()
})

router.get('/', getReferees);
router.get('/:id', getReferee);
router.post('/', Authenticate, isLeagueSecretary, newReferee);
router.put('/:id', Authenticate, isLeagueSecretary, replaceReferee);
router.patch('/:id', Authenticate, isLeagueSecretary, updateReferee);
router.delete('/:id', Authenticate, isLeagueSecretary, deleteReferee);

module.exports = router;