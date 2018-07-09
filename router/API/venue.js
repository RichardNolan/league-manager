const express = require('express');
const router = express.Router();
const { Authenticate, isAdmin, isLeagueSecretary } = require('../../auth/passport');
const {venue} = require('../../database/controllers/');

const getVenues = (req, res, next)=>{
    venue
        .getVenues(req.query || {})
        .then(data=>res.status(200).json(data))
        .catch(next)    
}
const getVenue = (req, res, next)=>{
    venue
        .getVenue(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const newVenue = (req, res, next)=>{
    venue
        .newVenue(req.body)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const replaceVenue = (req, res, next)=>{
    res.redirect('/')
}

const updateVenue = (req, res, next)=>{
    res.redirect('/')
}

const deleteVenue = (req, res, next)=>{
    res.redirect('/')
}

router.use((req,res,next)=>{
    console.log("Venue route middleware stub")
    next()
})

router.get('/', getVenues);
router.get('/:id', getVenue);
router.post('/', Authenticate, isLeagueSecretary, newVenue);
router.put('/:id', Authenticate, isLeagueSecretary, replaceVenue);
router.patch('/:id', Authenticate, isLeagueSecretary, updateVenue);
router.delete('/:id', Authenticate, isLeagueSecretary, deleteVenue);

module.exports = router;