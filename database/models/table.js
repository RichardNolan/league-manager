const mongoose = require('../database');
const {ObjectId} = mongoose.Schema.Types

const tableSchema = new mongoose.Schema({
    p:Number,
    w:Number,
    d:Number,
    l:Number,
    f:Number,
    a:Number,
    gd:Number,
    pts:Number,
    hp:Number,
    hw:Number,
    hd:Number,
    hl:Number,
    hf:Number,
    ha:Number,
    hgd:Number,
    hpts:Number,
    ap:Number,
    aw:Number,
    ad:Number,
    al:Number,
    af:Number,
    aa:Number,
    agd:Number,
    apts:Number,
})
const Schema = new mongoose.Schema({
    table: tableSchema,
    team: {type: ObjectId, ref: 'team'},
    division:  {type: ObjectId, ref: 'division'},
})

module.exports = mongoose.model('table', Schema);