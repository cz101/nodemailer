const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const nodeoutlook = require("nodejs-nodemailer-outlook")


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

router.get('/welcome', async (req, res) => {
  
  //res.send("here it is in empty")

//   res.render("index")

    res.render('welcome', { layout: 'welcome' });


 })

router.get('/', async (req, res) => {
  
    //res.send("here it is")

  res.render("index")
 //  res.render("welcome")
   //res.render( { title: 'Welcome', layout: '../views/layouts/welcome' })

  })

  router.get('/contact', async (req, res) => {
  
     //res.send("here it is")
 
    res.render("contact/contact")
 
   })


  router.post("/contact/send", (req, res) => {
    
/*
    var mail = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
  
          user: process.env.EMAIL,
          pass: process.env.PASS,
      }       
    });
*/


    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
      //console.log(fields);
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
        //console.log(data.FirstName);
      });
   
    var mailOptions = {
      from: 'czweb99@outlook.com',
      to:  'chaowow@gmail.com',
      subject: 'You got a message from the Web',
      text:   "==================MESSAGE==================" +"\n"+
             "From :\t"+ data.Email +" \n"+
             "FN   :\t"+ data.FirstName + "\n"+  
             "LN   :\t"+ data.LastName+ " \n"+
             "Phone :\t"+ data.Phone +"\n"+
             "Message :\t "+ data.form_message + '\n'+
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

  });

  // res.send("emails is sent ");
   res.redirect('/');

});






module.exports = router
