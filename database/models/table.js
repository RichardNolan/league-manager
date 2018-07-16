const mongoose = require('../database');
const {ObjectId} = mongoose.Schema.Types

const tableSchema = new mongoose.Schema({
    team: {type: ObjectId, ref: 'team'},
    p:Number,
    w:Number,
    d:Number,
    l:Number,
    f:Number,
    a:Number,
    gd:Number,
    pts:Number,
    form:String,
    hp:Number,
    hw:Number,
    hd:Number,
    hl:Number,
    hf:Number,
    ha:Number,
    hgd:Number,
    hpts:Number,
    hform:String,
    ap:Number,
    aw:Number,
    ad:Number,
    al:Number,
    af:Number,
    aa:Number,
    agd:Number,
    apts:Number,
    aform:String,
})
const Schema = new mongoose.Schema({
    table: [tableSchema],
    division:  {type: ObjectId, ref: 'division'},
})

module.exports = mongoose.model('table', Schema);