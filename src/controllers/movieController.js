const service = require('../services/movieService');

exports.listAllMovies = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  try {
    const movies = await service.getAllMovies(page);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMovieDetails = async (req, res) => {
  const { imdbId } = req.params;
  try {
    const movie = await service.getMovieDetails(imdbId);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listByYear = async (req, res) => {
  const { year } = req.params;
  const page = parseInt(req.query.page) || 1;
  try {
    const movies = await service.getMoviesByYear(year, page);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listByGenre = async (req, res) => {
  const { genre } = req.params;
  const page = parseInt(req.query.page) || 1;
  try {
    const movies = await service.getMoviesByGenre(genre, page);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
