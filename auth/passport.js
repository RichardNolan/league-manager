const JwtStrategy = require('passport-jwt').Strategy
const passport = require('passport');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const User = require('../database/models/user');

const emailer = require('../methods/emailer')

const generatePassword = ()=>{
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let pw = ''
    while(pw.length<8){
        let x = Math.round(Math.random()*characters.length)
        pw+=characters.charAt(x)
    }
    return pw
}

const getToken = r=> {
    if(r.cookies.token) return r.cookies.token
    if(r.body.token) return r.body.token
    if(r.query.token) return r.query.token

    let {headers} = r
    if (headers) {

        if(headers['x-access-token']) return headers['x-access-token']
        if(headers.authorization){
            let parted = headers.authorization.split(' ');
            if (parted.length === 2) return parted[1];
            else return null;
        }

    } 

    return null
};

const Passport = passport=> {
    var opts = {};
    opts.jwtFromRequest = getToken 
    opts.secretOrKey = process.env.SECRET_CODE;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
        User.findById(jwt_payload.data._id, (err, user)=> {
            if(err) return done(err, false);
            else if(user) done(null, user);
            else done(null, false);
        });
    }));
}

const signin = (req, res)=> {
    console.log("SIGNING IN ")
    User.findOne({ email: req.body.email })
    .then(user=> {
        console.log("USER ", user)
        if (!user) throw 'Authentication failed. User not found.'
        else {
            console.log("NO ERRORS FINDING USER")
            user.comparePassword(req.body.password, (err, isMatch)=> {
                console.log("PASSWORDS MATCH", isMatch)
                user.password = ""
                if(isMatch) res.status(200).json( {success: true, token:jwt.sign( {data:user}, process.env.SECRET_CODE, {expiresIn:60*60} ), user:user} )
                else throw 'Authentication failed. Wrong password.'      
            });
        }
    })
    .catch(err=>res.status(401).send({success: false, message: err})  )
}

const signup = (req, res)=> {
    req.body.password = req.body.password1===req.body.password2 ? req.body.password1 : ''
    var newUser = new User(req.body);
    console.log(newUser)
    newUser.save(err=> {
        console.log('SAVED')
      if(err) return res.json({success: false, message: err});
      res.json({success: true, message: 'Successful created new user.'});
    });
  
}

const forgotpassword = (req, res)=> {
    console.log("Starting forgotten password routine")
    let new_password = generatePassword()
    let hashedPassword = bcrypt.hashSync(new_password, 8);

    User.findOneAndUpdate({ email: req.body.email}, { $set: { password: hashedPassword }}, {new:true},  (err, user)=>{ 
        console.log(user.secret, req.body.secret, user.secret===req.body.secret)          
        if(err) res.status(401).send({success: false, message: 'Something went wrong'})
        else if(!user) res.status(401).send({success: false, message: 'Email address not found'}) 
        else if(user.secret!==req.body.secret) res.status(401).send({success: false, message:'You answered the question wrong'}) 
        else{
            let message = {
                from: 'no-reply@leaguemanager.com',
                to: user.email,
                subject: 'Your password has been reset',
                text: `Your new password is... ${new_password}`,
                html: `<h2>Your new password...</h2>
                    <h4>Here\'s your new password</h4>
                    <h1>${new_password}</h1>`,
            };

            emailer.transporter.sendMail(message)
            .then(data=>{
                console.log("EMAIL SEEMS TO HAVE SENT")
                let emailLink = 'https://ethereal.email/message/'+ data.response.split('MSGID=')[1].split('').reverse().slice(1).reverse().join('')
                res.status(200).json( {success: true, message:'An email has been sent to the provided email address with a new password.', link:emailLink} )
            })
            .catch(err=>console.log("ERROR", err))
        }
    })
}


const isAdmin = (req,res,next)=>{
    if(req.user.isAdmin) next()
    else throw {message:"Not an Admin"}
}

const isReferee = (req,res,next)=>{
    if(
        req.user.isReferee || 
        req.user.isAdmin || 
        req.user.isLeagueSecretary 
    ) next()
    else throw {message:"Not a Referee"}
}

const isLeagueSecretary = (req,res,next)=>{
    if(
        req.user.isAdmin || 
        req.user.isLeagueSecretary 
    ) next()
    else throw {message:"Not a League Secretary"}
}

const isClubOfficial = (req,res,next)=>{
    if(
        req.user.isAdmin || 
        req.user.isClubOfficial  || 
        req.user.isLeagueSecretary
    ) next()
    else throw {message:"Not a Club Official"}
}

const isTeamManager = (req,res,next)=>{
    if(
        req.user.isAdmin || 
        req.user.isTeamManager  || 
        req.user.isLeagueSecretary
    ) next()
    else throw {message:"Not a Team Manager"}
}

const isMember = (req,res,next)=>{
    if(
        req.user.isAdmin || 
        req.user.isMember 
    ) next()
    else throw {message:"Not a Member"}
}

const isMe = (req,res,next)=>{
    if(
        req.user.isAdmin ||  
        req.user.isLeagueSecretary || 
        req.user._id === req.params.id 
    ) next()
    else throw {message:"Not Authorised"}
}

const canUpdateScores =  (req,res,next)=>{
    if(
        req.user.isAdmin || 
        req.user.isLeagueSecretary || 
        req.user.isClubOfficial ||
        req.user.isReferee
    ) next()
    else throw {message:"You can't update a scoreline"}
}

Passport(passport);

module.exports = {
    Passport,
    Authenticate: passport.authenticate('jwt', { session: false}),
    getToken,
    signin,
    signup,
    forgotpassword,
    isAdmin,
    isReferee,
    isLeagueSecretary,
    isTeamManager, 
    isClubOfficial,
    isMember,
    isMe,
    canUpdateScores,
    
}