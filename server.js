const express = require("express")

require("dotenv").config();

const passport = require('passport')
const session = require('express-session')
var mongoose = require('mongoose');
var crypto = require('crypto');

const connection = require('./config/database');

require('./config/passport');

const expressLayout = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const sparetimeRouter = require('./routes/sparetimes')
const workRouter = require('./routes/works')
/*
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
*/

xmlparser = require('express-xml-bodyparser');


var app = express()


app.set('view engine', 'ejs')
app.set('views', __dirname +'/views')
app.set('layout', 'layouts/layout')
//app.set('layout welcome',false)


app.use(express.json());
app.use(express.urlencoded({extended: true}));



/**
 * -------------- SESSION SETUP ----------------
 */
 app.use(require("express-session")({
  secret: "Rusty is the worst and ugliest dog in the wolrd",
  resave: true,
  saveUninitialized: true
}));

 app.use(passport.initialize())
 app.use(passport.session())

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */




/**
 * --------------Page Layout ----------------
 */

app.use(expressLayout)

 
// app.use(xmlparser());

app.use( express.static(__dirname + '/public'));
app.use('/sparetimes', express.static(__dirname + '/public'));
app.use('/works', express.static(__dirname + '/public'));
app.use('/contact', express.static(__dirname + '/public'));



/**
 * -------------- ROUTES ----------------
 */


app.use('/', indexRouter)
app.use('/sparetimes', sparetimeRouter)
app.use('/works', workRouter)



/**
 * -------------- SERVER ----------------
 
 app.use((req, res, next)=>{
  
  console.log("here is session and user ");
  console.log(req.session);
  console.log(req.user);
  next();

});
*/

app.listen(process.env.PORT || 5000)
