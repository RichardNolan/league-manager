const mongoose = require('../database');
const {ObjectId} = mongoose.Schema.Types

const Scoreline = new mongoose.Schema({
    home_score: Number,
    away_score: Number,
})

const Scorer = new mongoose.Schema({
    player: {type: ObjectId, ref: 'player'},
    time: Number,
})

const Schema = new mongoose.Schema({
    fixture: {type: ObjectId, ref: 'score'},
    score_home:Number,
    score_away:Number,
    referee_home: Number,
    referee_away: Number,
    club_official_home: Number,
    club_official_away: Number,
    // referee_half_time: Scoreline,
    // referee_full_time: Scoreline,
    // referee_after_extra_time: Scoreline,
    // referee_after_penalties: Scoreline,
    // club_official_half_time: Scoreline,
    // club_official_full_time: Scoreline,
    // club_official_after_extra_time: Scoreline,
    // club_official_after_penalties: Scoreline,
    // half_time: Scoreline,
    // full_time: Scoreline,
    // after_extra_time: Scoreline,
    // after_penalties: Scoreline,
    // scorers: [Scorer],
})

module.exports = mongoose.model('score', Schema);