const mongoose = require('../database');

const Schema = new mongoose.Schema({
    title: String,
    organisation:  {type: mongoose.Schema.Types.ObjectId, ref: 'organisation'},
    user:  {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
})

module.exports = mongoose.model('referee', Schema);