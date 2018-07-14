const express = require('express');
const router = express.Router();
const {publicArea, privateArea} = require('../../auth/authorisation');
const {time_slot} = require('../../database/controllers');

const findTime_slots = (req, res, next)=>{
    time_slot
        .findTime_slot(req.query || {})
        .then(result=>{
            console.log(result)
            res.status(200).json(result)
        })
        .catch(err=>console.log(err))
}

const getTime_slots = (req, res, next)=>{
    time_slot
        .getTime_slot(req.params.id)
        .then(result=>{
            console.log(result)
            res.status(200).json(result)
        })
        .catch(err=>console.log(err))
}

const newTemplate = (req, res, next)=>{
    res.redirect('/')
}

const replaceTemplate = (req, res, next)=>{
    res.redirect('/')
}

const updateTemplate = (req, res, next)=>{
    res.redirect('/')
}

const deleteTemplate = (req, res, next)=>{
    res.redirect('/')
}

router.use((req,res,next)=>{
    console.log("Template route middleware stub")
    next()
})

router.get('/', findTime_slots);
router.get('/:id', getTime_slots);
router.post('/', privateArea, newTemplate);
router.put('/:id', privateArea, replaceTemplate);
router.patch('/:id', privateArea, updateTemplate);
router.delete('/:id', privateArea, deleteTemplate);

module.exports = router;