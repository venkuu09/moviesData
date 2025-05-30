const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieController');

router.get('/movies', controller.listAllMovies);
router.get('/movies/details/:imdbId', controller.getMovieDetails);
router.get('/movies/year/:year', controller.listByYear);
router.get('/movies/genre/:genre', controller.listByGenre);

module.exports = router;
