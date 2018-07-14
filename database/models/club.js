const mongoose = require('../database');
const {ObjectId} = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    title: String,
    title_short:String,
    primary_color: String,
    secondary_color: String,
    crest:String,
    organisation: {type: ObjectId, ref: 'organisation'},
    venue:  String,
    // venue:  {type: ObjectId, ref: 'venue'},
    teams: [{type: ObjectId, ref: 'team'}],
    users: [{type: ObjectId, ref: 'user'}],
    other: String,
})

module.exports = mongoose.model('club', Schema);