const mongoose = require('../database');
const {ObjectId} = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    title: String,
    title_short:String,
    primary_color: String,
    crest:String,
    organisation: {type: ObjectId, ref: 'organisation'},
    venues:  [{type: ObjectId, ref: 'venue'}],
    teams: [{type: ObjectId, ref: 'team'}],
    users: [{type: ObjectId, ref: 'user'}],
})

module.exports = mongoose.model('club', Schema);