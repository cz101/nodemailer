
const nodemailer = require("nodemailer");



const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = connection.models.User;
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

const Contact= connection.models.Contact;


/**
* -------------- GET CONTACT ROUTES ----------------
also sending the contact email and save contact infomation in DB
*/



/*  send the emails based on the contact information */
const transporter = nodemailer.createTransport({

    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
  }
});


transporter.verify(function (error, success) {
  if (error) {
    console.log("connecting to the Mail server")
    console.log(error);
  } else {
    console.log("Live/Outlook Server is ready ");
  }
});


router.get('/contact', async (req, res) => {
  
 res.render("contact/contact")

})


router.post("/contact/send", (req, res, next) => {

 console.log(req.body);
 
const newContact = new Contact({
  firstName: req.body.FirstName,
  lastNamne :req.body.LastName,
  phone:req.body.Phone,
  email:req.body.email,
  message: req.body.form_message,
});

newContact.save()

var mailOptions = {
  
  from: 'czweb99@outlook.com',
  to:  'chaowow@gmail.com',
  subject: 'You got a message from the Web',
  text:   "==================MESSAGE==================" +"\n"+
         "From :\t"+ req.body.Email +" \n"+
         "FN   :\t"+ req.body.FirstName + "\n"+  
         "LN   :\t"+ req.body.LastName+ " \n"+
         "Phone :\t"+ req.body.Phone +"\n"+
         "Message :\t "+ req.body.form_message + '\n'+
         "=====================END====================" +"\n", 
   
}

transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(500).send("Something went wrong.");
      } else {
        console.log('Email successfully sent: ' + info.response);
        //res.status(200).send("Email successfully sent to recipient!");
      }
});

  res.redirect('/');

});

/**
* -------------- login and register ----------------
* registrar form 
*/

router.post('/login', passport.authenticate('local', { 
        failureRedirect: '/login-failure', 
        successRedirect: '/home',
        failureFlash: true }));


router.post('/register', (req, res, next) => {
   const saltHash = genPassword(req.body.pw);
   
   const salt = saltHash.salt;
   const hash = saltHash.hash;

   var newUser = new User({
       username: req.body.uname,
       hash: hash,
       salt: salt,
       admin: false
   });

   newUser.save()
       .then((user) => {
           console.log(user);
       });

   res.redirect('/login');
});


/**
* -------------- GET ROUTES ----------------
*/

router.get ('/index.html', (req,res, next)=>{

  res.render('welcome',{ layout: 'welcome' });
} )

router.get ('/home', (req,res, next)=>{
  
  res.render('home.ejs', {
    name : req.body.uname}  )
})



function aisAuth(req, res, next){
   if (req.isAuthenticated()) {
       next();
   } else {
       res.status(401).json({ msg: 'You are not authorized to view this resource' });
   }
}

function aisAdmin (req, res, next){
   if (req.isAuthenticated() && req.user.admin) {
       next();
   } else {
       res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
   }
}



module.exports = router
