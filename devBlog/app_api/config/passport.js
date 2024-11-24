const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

passport.use(new LocalStrategy
({
    usernameField: 'email' 
},
async (username, password, done) =>
{
    const q = await User.findOne({ email: username }).exec();

    //invalid username
    if(!q)  { return done(null, false, { message : 'Incorrect Username'}); }

    //invalid password.  
    if(!q.validPassword(password)) { return done(null, false, { message: 'Incorrect Password'}); }
    
    return done(null, q); //password and username correct.  consistency in casing.  
}));

//potentially a file with typos in it.  