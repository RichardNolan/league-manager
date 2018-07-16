const express = require('express');
const router = express.Router();
const { Authenticate, isLeagueSecretary } = require('../../auth/passport');
const {division, team} = require('../../database/controllers/');

const getDivisions = (req, res, next)=>{
    division
        .getDivisions(req.query || {})
        .then(data=>res.status(200).json(data))
        .catch(next)    
}
const getDivision = (req, res, next)=>{
    console.log("ROUTE")
    division 
        .getDivision(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(next)   
}

const newDivision = (req, res, next)=>{
    res.redirect('/')
}

const replaceDivision = (req, res, next)=>{
    res.redirect('/')
}

const updateDivision = (req, res, next)=>{
    res.redirect('/')
}

const deleteDivision = (req, res, next)=>{
    res.redirect('/')
}

const newFixtureList = async (req, res, next)=>{
    division
        .createFixtureList(req.params.id)
        .then(fixturelist=> res.json(fixturelist))
    
}

router.use((req, res, next)=>{
    console.log("Division route middleware stub")
    next()
})

router.get('/', getDivisions);
router.get('/:id', getDivision);
router.get('/:id/newfixturelist', Authenticate, isLeagueSecretary, newFixtureList);
router.post('/', Authenticate, isLeagueSecretary, newDivision);
router.put('/:id', Authenticate, isLeagueSecretary, replaceDivision);
router.patch('/:id', Authenticate, isLeagueSecretary, updateDivision);
router.delete('/:id', Authenticate, isLeagueSecretary, deleteDivision);


module.exports = router;