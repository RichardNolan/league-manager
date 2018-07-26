const mongoose = require('../database');
const {ObjectId} = mongoose.Schema.Types
const bcrypt = require('bcryptjs');

const Schema = new mongoose.Schema({
    title: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    secret: {
        type:String,
        required:true,
    },
    last_signed_in: Date,
    isAdmin: {
        type:Boolean,
        default:false,
    },
    isClubOfficial: {
        type:Boolean,
        default:false,
    },
    isLeagueSecretary: {
        type:Boolean,
        default:false,
    },
    isReferee: {
        type:Boolean,
        default:false,
    },
    isTeamManager: {
        type:Boolean,
        default:false,
    },
    isMember: {
        type:Boolean,
        default:false,
    },
    team:  {
        type: ObjectId, 
        ref: 'team',
        required: false,
    },
    club:  {
        type: ObjectId, 
        ref: 'club',
        required: false,
    },
    organisation:  {
        type: ObjectId, 
        ref: 'organisation',
        required:false,
    },
})


Schema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        let hashedPassword = bcrypt.hashSync(user.password, 8);
        user.password = hashedPassword;               
    } else {
        return next();
    }
    next()
});

Schema.methods.comparePassword = function(password, cb) {   
    if(bcrypt.compareSync(password, this.password)) {
        cb(null, true)
    }
    else throw cb(true, false)
}

module.exports = mongoose.model('user', Schema);