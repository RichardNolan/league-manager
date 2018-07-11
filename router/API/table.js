const express = require('express');
const router = express.Router();
const { Authenticate, isAdmin } = require('../../auth/passport');
const {table} = require('../../database/controllers/');

const getTables = (req, res, next)=>{
    table
        .getTables(req.query || {})
        .then(data=>res.status(200).json(data))
        .catch(next)    
}
const getTable = (req, res, next)=>{
    table
        .getTable(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(next)    
}

// const newTable = (req, res, next)=>{
//     res.redirect('/')
// }

// const replaceTable = (req, res, next)=>{
//     res.redirect('/')
// }

// const updateTable = (req, res, next)=>{
//     res.redirect('/')
// }

// const deleteTable = (req, res, next)=>{
//     res.redirect('/')
// }

router.use((req,res,next)=>{
    console.log("Table route middleware stub")
    next()
})

router.get('/', getTables);
router.get('/:id', getTable);
// router.post('/', privateArea, newTable);
// router.put('/:id', privateArea, replaceTable);
// router.patch('/:id', privateArea, updateTable);
// router.delete('/:id', privateArea, deleteTable);

module.exports = router;