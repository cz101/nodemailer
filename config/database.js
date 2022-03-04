const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

const connection = mongoose.createConnection(process.env.DBCONNSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open',()=> console.log("connected to DB"))

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin:Boolean
});


const contactSchema = new mongoose.Schema({ 
    firstName: String,
    lastNamne: String,
    phone: String,
    email:String,
    message:String
});


const User = connection.model('User', UserSchema);
const Contact = connection.model('Contact', contactSchema);

// Expose the connection
module.exports = connection;