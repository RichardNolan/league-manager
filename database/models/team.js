const mongoose = require('../database');
const {ObjectId} = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    title: String,
    title_short: String,
    category: String,
    division:  {type: ObjectId, ref: 'division'},
    club: {type: ObjectId, ref: 'club'},
    manager: {type: ObjectId, ref: 'user'},
    players: [ {type: ObjectId, ref: 'player'} ],
    users:  [ {type: ObjectId, ref: 'user'} ],
    fixtures:  [ {type: ObjectId, ref: 'fixture'} ],
})

module.exports = mongoose.model('team', Schema);