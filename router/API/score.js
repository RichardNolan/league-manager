const express = require('express');
const router = express.Router();
const { Authenticate, canUpdateScores } = require('../../auth/passport');
const {score, fixture} = require('../../database/controllers/');

// const getScores = (req, res, next)=>{
//     res.redirect('/')
// }
// const getScore = (req, res, next)=>{
//     res.redirect('/')
// }



const upsertScore = (req, res, next)=>{
    // score
    fixture  
        .upsertScore(req.body || {})
        .then(result=>res.status(200).json(result))
        .catch(err=>console.log(err))
}

// const replaceScore = (req, res, next)=>{
//     res.redirect('/')
// }

// const updateScore = (req, res, next)=>{
//     res.redirect('/')
// }

// const deleteScore = (req, res, next)=>{
//     res.redirect('/')
// }

router.use((req,res,next)=>{
    console.log("Score route middleware stub")
    next()
})

// router.get('/', getScores);
// router.get('/:id', getScore);
router.post('/', Authenticate, canUpdateScores, upsertScore);
// router.put('/:id', Authenticate, canUpdateScores, replaceScore);
// router.patch('/:id', Authenticate, canUpdateScores, updateScore);
// router.delete('/:id', Authenticate, canUpdateScores, deleteScore);

module.exports = router;