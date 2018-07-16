const mongoose = require('../database');
const {ObjectId} = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    title: String,
    rank: Number,
    league: {type: ObjectId, ref: 'league'},
    teams: [ {type: ObjectId, ref: 'team'} ],
    table: {type: ObjectId, ref: 'table'} ,
})

module.exports = mongoose.model('division', Schema);