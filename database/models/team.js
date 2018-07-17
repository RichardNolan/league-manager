const mongoose = require('../database');
const {ObjectId} = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    title: String,
    title_short: String,
    category: String,
    division:  {type: ObjectId, ref: 'division'},
    table:  {type: ObjectId, ref: 'table'},
    club: {type: ObjectId, ref: 'club'},
    organisation: {type: ObjectId, ref: 'organisation'},
    manager: {type: ObjectId, ref: 'user'},
    players: [ {type: ObjectId, ref: 'player'} ],
    users:  [ {type: ObjectId, ref: 'user'} ],
    fixtures:  [ {type: ObjectId, ref: 'fixture'} ],
    nextFixture: {type: ObjectId, ref: 'fixture'},
    lastResult: {type: ObjectId, ref: 'fixture'},
})

module.exports = mongoose.model('team', Schema);