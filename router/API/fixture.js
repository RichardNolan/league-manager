const express = require('express');
const router = express.Router();
const { Authenticate, isLeagueSecretary } = require('../../auth/passport');
const {fixture} = require('../../database/controllers/');

const getFixtures = (req, res, next)=>{
    fixture
        .getFixtures(req.query || {})
        .then(data=>res.status(200).json(data))
        .catch(next)
}   

const getFixture = (req, res, next)=>{
    fixture
        .getFixture(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(next)
}

const newFixtures = (req, res, next)=>{
    fixture
        .createFixtureList(req.body)
        .then(data=>res.status(200).json(data))
        .catch(next)
}

const replaceFixture = (req, res, next)=>{
    res.redirect('/')
}

const updateFixture = (req, res, next)=>{
    console.log("API METHOD")
    fixture 
        .updateFixture(req.params.id, req.body)
        .then(data=>res.status(200).json(data))
        .catch(next)
}

const deleteFixture = (req, res, next)=>{
    res.redirect('/')
}

router.use((req, res, next)=>{
    console.log("fixture route middleware stub")
    next()
})

router.get('/', getFixtures);
router.get('/:id', getFixture);
router.post('/', Authenticate, isLeagueSecretary, newFixtures);
router.post('/:id', Authenticate, isLeagueSecretary, updateFixture);
// router.patch('/:id', Authenticate, isLeagueSecretary, updateFixture);
router.delete('/:id', Authenticate, isLeagueSecretary, deleteFixture);

module.exports = router;