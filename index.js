const dotenv = require('dotenv').config()
const express = require("express");
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const router = require('./router/');
const logger = require('morgan');
const {attachCORSHeaders} = require('./middleware/')

const app = express()

app.use( express.static(path.join(__dirname, '/front-end/build/') ) )
app.use( favicon(path.join(__dirname, '/front-end/build/favicon.ico') )) 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachCORSHeaders);

var passport = require('passport');
app.use(passport.initialize());

app.use(router);

app.use('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/front-end/build/index.html'))
});
//THIS IS A GENERIC ERROR HANDLING MIDDLEWARE
//THIS NEEDS TO BE REDONE
app.use(function (err, req, res, next) {
    console.log(err)
    res.status(500).send({error:true, message:err})
})


let port = process.env.PORT || 9000
app.listen(port, ()=>{
    console.log("Server started on port " + port);
    //require('./tests')();
});

module.exports = app