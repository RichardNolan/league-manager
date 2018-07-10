const express = require('express');
const router_api = require('./router_api');
const router_view = require('./router_view');

const { Authenticate, signin, signup } = require('../auth/passport');

const router = express.Router();

router.use('/api', router_api);

  
router.get('/test', Authenticate, function(req, res) {    
  res.json({success: true, message: 'Got the test page'});
});

// router.use('/', router_view);


router.use((req,res)=>{
    res.sendStatus(404);
});

module.exports = router;