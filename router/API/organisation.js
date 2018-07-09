const express = require('express');
const router = express.Router();
const { Authenticate, isAdmin } = require('../../auth/passport');
const {organisation} = require('../../database/controllers/');

const getOrganisations = (req, res, next)=>{
    organisation
        .getOrganisations(req.query || {})
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const getOrganisation = (req, res, next)=>{
    organisation 
        .getOrganisation(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const newOrganisation = (req, res, next)=>{
    organisation
        .newOrganisation(req.body)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

const replaceOrganisation = (req, res, next)=>{
    res.redirect('/')
}

const updateOrganisation = (req, res, next)=>{
    res.redirect('/')
}

const deleteOrganisation = (req, res, next)=>{
    res.redirect('/')
}

router.use((req, res, next)=>{
    console.log("Organisation route middleware stub")
    next()
})

router.get('/', getOrganisations);
router.get('/:id', getOrganisation);
router.post('/', Authenticate, newOrganisation);
router.put('/:id', Authenticate, isAdmin, replaceOrganisation);
router.patch('/:id', Authenticate, isAdmin, updateOrganisation);
router.delete('/:id', Authenticate, isAdmin, deleteOrganisation);

module.exports = router;