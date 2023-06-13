// -------------------------------------------------------------
// - Robert Bettinelli - MDEV1004 - S2023 - Assignment#1
// - 090003683@student.georgianc.on.ca
// -------------------------------------------------------------
// (Config) app.ts - As Provided in Class Instruction
// Personally entered and followed as pert of in class learning.
// -------------------------------------------------------------
// 06/10/2023 - RBettinelli - Header and Documentation Added
// -------------------------------------------------------------

import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from '../Routes/index';
import mongoose from 'mongoose';
import db from './db';

// Modules for Auth.
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';

// authentication objects
let strategy = passportLocal.Strategy; // alias
import User from '../Models/user';

// Mongoose Connection Functionality
// db.remoteURI - MongoDB Atlas 
// db.localURI  - MongoDB LocalHost  
mongoose.connect(db.remoteURI);
mongoose.connection.on('connected', function() {
    console.log(`connected to mongo.`);
});
mongoose.connection.on('disconnected', function() {
    console.log(`mongo disconnected.`);
});

// App configuration setup Base Access Point.
let app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// setup express session
app.use(session({
    secret: db.secret,
    saveUninitialized: false,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

// implement an Auth Strategy
passport.use(User.createStrategy());

// serialize and deserialize user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.use(strategy);

app.use('/api/', indexRouter);

export default app;
