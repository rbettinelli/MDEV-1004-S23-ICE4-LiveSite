// -------------------------------------------------------------
// - Robert Bettinelli - MDEV1004 - S2023 - Assignment#1
// - 090003683@student.georgianc.on.ca
// -------------------------------------------------------------
// (Routes) index.ts - As Provided in Class Instruction
// Personally entered and followed as pert of in class learning.
// -------------------------------------------------------------
// 06/10/2023 - RBettinelli - Header and Documentation Added
// -------------------------------------------------------------

import express, { response } from 'express';
let router = express.Router();

import {DisplayMovieList, DisplayMovieByID, AddMovie, UpdateMovie, DeleteMovie } from '../Controllers/movie';

// Movie List Route
router.get('/list', function(req, res, next) {
  DisplayMovieList(req, res, next);
});

// Find By ID Route
router.get('/find/:id', function(req, res, next) {
  DisplayMovieByID(req, res, next);
});

// Add Document Route
router.post('/add', function(req, res, next) {
  AddMovie(req, res, next);
});

// Delete By ID Route
router.delete('/delete/:id', function(req, res, next) {
  DeleteMovie(req, res, next);
});

// Update Document By ID Route
router.put('/update/:id', function(req, res, next) {
  UpdateMovie(req, res, next);
});

export default router;