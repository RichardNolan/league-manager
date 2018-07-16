const mongoose = require('../database');
const {ObjectId} = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    date: Date,
    status: String,
    venue: {type: ObjectId, ref: 'venue'},
    competition: {type: ObjectId, ref: 'competition'},
    division: {type: ObjectId, ref: 'division'},
    referee: {type: ObjectId, ref: 'referee'},
    home_team: {type: ObjectId, ref: 'team'},
    away_team: {type: ObjectId, ref: 'team'},
    other_leg_fixture: {type: ObjectId, ref: 'fixture'},
    // score: {type: ObjectId, ref: 'score'},
    time_slot: {type: ObjectId, ref: 'time_slot'},

    // ADDED FROM SCORE SCHEMA
    score_home:Number,
    score_away:Number,
    referee_home: Number,
    referee_away: Number,
    club_official_home: Number,
    club_official_away: Number,
})

module.exports = mongoose.model('fixture', Schema);