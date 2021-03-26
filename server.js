const express = require("express")
const app = express()

const nodemailer = require("nodemailer");
const multiparty = require("multiparty");

require("dotenv").config();

const expressLayout = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const sparetimeRouter = require('./routes/sparetimes')
const workRouter = require('./routes/works')

const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
/*
const mongoose = require('mongoose')
mongoose.connect(process.env.DATEBASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open',()=>console.log('Connected to mongoose database'))

*/

app.set('view engine', 'ejs')
app.set('views', __dirname +'/views')
app.set('layout', 'layouts/layout')
app.set('layout welcome',false)

app.use(expressLayout)
//app.use(express.static('/public'))





app.use( express.static(__dirname + '/public'));
app.use('/sparetimes', express.static(__dirname + '/public'));
app.use('/works', express.static(__dirname + '/public'));
app.use('/contact', express.static(__dirname + '/public'));

/*
app.set('views', __dirname +'/views')
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')

app.use(expressLayout)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))
app.use(methodOverride('_method'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

*/

app.use('/', indexRouter)
app.use('/sparetimes', sparetimeRouter)
app.use('/works', workRouter)

/*
app.route("/").get(function (req, res) {
    res.sendFile(process.cwd() + "/public/index.html");
  })
*/
app.listen(process.env.PORT || 5000)

/*
app.listen(5001, () => {
    console.log(`Listening on port ...`);
  });


  app.post("/send", (req, res) => {
    //1.
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
      console.log(fields);
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
      });
  
      //2. You can configure the object however you want
      const mail = {
        from: data.name,
        to: process.env.EMAIL,
        subject: data.subject,
        text: `${data.name} <${data.email}> \n${data.message}`,
      };
  
      //3.
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        } else {
          res.status(200).send("Email successfully sent to recipient!");
        }
      });
    });
  });


  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //replace with your email provider
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });


  var mail = nodemailer.createTransport({
    service: 'hotmail',
    auth: {

        user: process.env.EMAIL,
        pass: process.env.PASS,
    }       
  });
  
  var mailOptions = {
     from: 'czweb99@outlook.com',
     to: 'chaowow@gmail.com',
     subject: 'Sending Email using Node.js',
     html: ' That was easy! one more time'     
  }
  
  mail.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
  });

 */ 

  /*

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
      console.log("Server is ready to take our messages");
    }
  });

  */