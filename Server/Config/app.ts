import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from '../Routes/index';
import mongoose from 'mongoose';
import db from './db';

mongoose.connect(db.remoteURI);
mongoose.connection.on('connected', function() {
    console.log(`connected to mongo.`);
});
mongoose.connection.on('disconnected', function() {
    console.log(`mongo disconnected.`);
});

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/', indexRouter);

export default app;
