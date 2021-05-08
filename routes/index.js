
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const nodeoutlook = require("nodejs-nodemailer-outlook")



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
  service: 'hotmail',
  auth: {

      user: process.env.EMAIL,
      pass: process.env.PASS,
  }
});


transporter.verify(function (error, success) {
  if (error) {
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

res.redirect('/home');

});

router.post('/login', passport.authenticate('local', { 
        failureRedirect: '/login-failure', 
        successRedirect: '/',
        failureFlash: true }));


router.post('/register', (req, res, next) => {
   const saltHash = genPassword(req.body.pw);
   
   const salt = saltHash.salt;
   const hash = saltHash.hash;

   const newUser = new User({
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

router.get ('/home', (req,res, next)=>{

  res.render('home.ejs', {
    name : req.body.uname}  )

} )

router.get('/', isAuth, (req, res, next) => {

  res.render('welcome',{ layout: 'welcome' });
   //res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});


router.get('/notauth', isAuth, (req, res, next) => {

  res.render('notauth',{ layout: 'notauth' });
   //res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});
// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
  /*
   const form = '<h1>Login Page</h1><form method="POST" action="/login">\
   Enter Username:<br><input type="text" name="uname">\
   <br>Enter Password:<br><input type="password" name="pw">\
   <br><br><input type="submit" value="Submit"></form>';

*/
   res.render('login.ejs', { layout: 'login' })
 //  res.send(form);

});

router.get('/loginauto', (req, res, next) => {

  res.render('loginauto',{ layout: 'loginauto' });
   //res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});
// When you visit http://localhost:3000/register, you will see "Register Page"
/*
router.get('/register', (req, res, next) => {

   const form = '<h1>Register Page</h1><form method="post" action="register">\
                   Enter Username:<br><input type="text" name="uname">\
                   <br>Enter Password:<br><input type="password" name="pw">\
                   <br><br><input type="submit" value="Submit"></form>';

   res.send(form);
   
});
*/
router.get('/register', (req,res,next) =>{

  res.render('register.ejs', { layout: 'register' })

})


/**
* Lookup how to authenticate users on routes with Local Strategy
* Google Search: "How to use Express Passport Local Strategy"
* 
* Also, look up what behaviour express session has without a maxage set
*/
router.get('/protected-route',isAuth,  (req, res, next) => {
    res.send('You made it to the route.');
   //res()
});

router.get('/admin-route', isAdmin, (req, res, next) => {
   res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
   req.logout();
   console.log("user is login out" )
   res.redirect('/login');
});

router.get('/login-success', isAuth, (req, res, next) => {
  
  res.render('index.ejs')

   //res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
  // res.send('You entered the wrong password.');
   res.render('loginfail.ejs', { layout: 'loginfail' })
});






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
