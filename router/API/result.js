const express = require('express');
const router = express.Router();
const { Authenticate, isLeagueSecretary } = require('../../auth/passport');
const {result} = require('../../database/controllers/');

const getResults = (req, res, next)=>{
    result
        .getResults(req.query || {})
        .then(data=>res.status(200).json(data))
        .catch(next)
}   

const getResult = (req, res, next)=>{
    result
        .getResult(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(next)
}


const updateResult = (req, res, next)=>{
    result 
        .updateResult(req.params.id, req.body)
        .then(data=>res.status(200).json(data))
        .catch(next)
}


router.use((req, res, next)=>{
    console.log("result route middleware stub")
    next()
})

router.get('/', getResults);
router.get('/:id', getResult);
router.post('/:id', Authenticate, isLeagueSecretary, updateResult);

module.exports = router;