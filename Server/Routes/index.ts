import express, { response } from 'express';
let router = express.Router();

import {DisplayMovieList, DisplayMovieByID, AddMovie, UpdateMovie, DeleteMovie } from '../Controllers/movie';

/* GET home page. */
router.get('/list', function(req, res, next) {
  DisplayMovieList(req, res, next);
});

/* GET home page. */
router.get('/find/:id', function(req, res, next) {
  DisplayMovieByID(req, res, next);
});

/* GET home page. */
router.post('/add', function(req, res, next) {
  AddMovie(req, res, next);
});

/* GET home page. */
router.delete('/delete/:id', function(req, res, next) {
  DeleteMovie(req, res, next);
});

/* GET home page. */
router.put('/update/:id', function(req, res, next) {
  UpdateMovie(req, res, next);
});

export default router;