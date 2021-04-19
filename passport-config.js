const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
  
     // console.log("chekcing 1:"+ getUserByEmail)
     // console.log("chekcing 2:"+ email)
      console.log("chekcing in initiallize")
      const user =  getUserByEmail(email)
      console.log(user)
      if (user == null) {
        return done(null, false, { message: 'No user with that email' })
      }
  
      try {
      
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch (e) {
        return done(e)
      }
    }
  
  
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
      return done(null, getUserById(id))
      })
  
  
  }
  
  
  module.exports = initialize