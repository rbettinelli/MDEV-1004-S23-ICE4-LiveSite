// -------------------------------------------------------------
// - Robert Bettinelli - MDEV1004 - S2023 - Assignment#1
// - 090003683@student.georgianc.on.ca
// -------------------------------------------------------------
// (Routes) index.ts - As Provided in Class Instruction
// Personally entered and followed as pert of in class learning.
// -------------------------------------------------------------
// 06/10/2023 - RBettinelli - Header and Documentation Added
// 06/12/2023 - RBettinelli - Added Login. 
// 07/22/2023 - RBettinelli - Added Secure Flag. 
// -------------------------------------------------------------

import express, { response } from 'express';
let router = express.Router();
import passport from 'passport';
import db from '../Config/db';

import {DisplayMovieList, DisplayMovieByID, AddMovie, UpdateMovie, DeleteMovie, DisplayMovieListTitle } from '../Controllers/movie';
import {ProcessRegistration ,ProcessLogin, ProcessLogout} from '../Controllers/login';


// Movie List Route
router.get('/list', function(req, res, next) {
  const now = new Date();
  console.log(now.toLocaleString());
  DisplayMovieList(req, res, next);
});

// Movie List movieID & Titles Route
router.get('/listTitle', function(req, res, next) {
  DisplayMovieListTitle(req, res, next);
});

// Find By ID Route
router.get('/find/:id', function(req, res, next) {
  DisplayMovieByID(req, res, next);
});

// Secure Flag to use Secure or non-secure Routes.
if (db.secure) {
  // Secure Flag Routes

  // Add
  router.post('/add',  passport.authenticate('jwt', {session: false}),function(req, res, next) {
    AddMovie(req, res, next);
  });

  // Update
  router.put('/update/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    UpdateMovie(req, res, next);
  });

  // Delete
  router.delete('/delete/:id', passport.authenticate('jwt', {session: false}),function(req, res, next) {
    DeleteMovie(req, res, next);
  });

}else {
  // Non-Secure Flag Set Routes
  
  // Add
  router.post('/add', function(req, res, next) {
    AddMovie(req, res, next);
  });
  // Update
  router.put('/update/:id', function(req, res, next) {
    UpdateMovie(req, res, next);
  });

  // Delete
  router.delete('/delete/:id', function(req, res, next) {
    DeleteMovie(req, res, next);
  });
}

// AUTHENTICATE
router.post('/register', function(req, res, next)
{
  ProcessRegistration(req, res, next);
});

router.post('/login', function(req, res, next)
{
  ProcessLogin(req, res, next);
});

router.get('/logout', function(req, res, next)
{
  ProcessLogout(req, res, next);
});


export default router;