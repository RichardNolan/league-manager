const express = require('express');
const router = express.Router();
const { Authenticate, canUpdateScores } = require('../../auth/passport');
const {fixture} = require('../../database/controllers/');

const getAwaitingScores = (req, res, next)=>{
    fixture
        .getAwaitingScore({}, req.user)
        .then(fixtures=>res.status(200).json(fixtures))
        .catch(err=>console.log(err))
}


// const getScore = (req, res, next)=>{
//     res.redirect('/')
// }



// const newScore = (req, res, next)=>{
//     score  
//         .addScore(req.body || {})
//         .then(result=>res.status(200).json(result))
//         .catch(err=>console.log(err))
// }

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

router.get('/',Authenticate, canUpdateScores, getAwaitingScores);
// router.get('/:id', getScore);
// router.post('/', Authenticate, canUpdateScores, newScore);
// router.put('/:id', Authenticate, canUpdateScores, replaceScore);
// router.patch('/:id', Authenticate, canUpdateScores, updateScore);
// router.delete('/:id', Authenticate, canUpdateScores, deleteScore);

module.exports = router;