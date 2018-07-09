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

const newFixture = (req, res, next)=>{
    res.redirect('/')
}

const replaceFixture = (req, res, next)=>{
    res.redirect('/')
}

const updateFixture = (req, res, next)=>{
    res.redirect('/')
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
router.post('/', Authenticate, isLeagueSecretary, newFixture);
router.put('/:id', Authenticate, isLeagueSecretary, replaceFixture);
router.patch('/:id', Authenticate, isLeagueSecretary, updateFixture);
router.delete('/:id', Authenticate, isLeagueSecretary, deleteFixture);

module.exports = router;