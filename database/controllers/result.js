const mongoose = require('../database');
const {fixture} = require('../models')
module.exports = {

    getResults: (body)=>{
        body.status = 'result'
        return fixture.find(body) 
         .where('date')
         .lt(Date.now())
         .sort({date:'asc'})
        //  .where('score_home')
        //  .gte(0)
        //  .where('score_away')
        //  .gte(0)
         .populate({ path: 'division', select:'_id title', populate:{path:'league', select:'_id title'} })
         .populate({ path: 'home_team', populate:{path:'club', select:'_id title_short venue'} })
         .populate({ path: 'away_team', populate:{path:'club', select:'_id title_short'} })
         .catch(err=>console.log(err))
    },

}