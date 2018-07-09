const express = require('express');
const router = express.Router();
const { Authenticate, isLeagueSecretary } = require('../../auth/passport');
const {club, user, team} = require('../../database/controllers');

const getClubs = (req, res, next)=>{
    club
        .getClubs(req.query || {})
        .then(data=>res.status(200).json(data))
        .catch(next)    
}
const getClub = (req, res, next)=>{
    club
        .getClub(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const getClubOfficials = (req, res, next)=>{
    user
        .getUsers({club:req.params.id, is_club_official:true})
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const newClub = (req, res, next)=>{
    club
        .newClub(req.body)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const replaceClub = (req, res, next)=>{
    club
        .replaceClub(req.body._id, req.body)
        .then(data=>res.status(200).json(data))
        .catch(next)   
}

const updateClub = (req, res, next)=>{
    club
        .updateClub(req.body._id, req.body)
        .then(data=>res.status(200).json(data))
        .catch(next)   
}

const deleteClub = (req, res, next)=>{
    res.redirect('/')
}

router.use((req, res, next)=>{
    console.log("Club route middleware stub")
    next()
})

router.get('/', getClubs);
router.get('/:id', getClub);
router.get('/:id/officials', getClubOfficials);
router.post('/', Authenticate, isLeagueSecretary, newClub);
router.put('/:id', Authenticate, isLeagueSecretary, replaceClub);
router.patch('/:id', Authenticate, isLeagueSecretary, updateClub);
router.delete('/:id', Authenticate, isLeagueSecretary, deleteClub);

module.exports = router;