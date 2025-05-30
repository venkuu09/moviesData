import express from 'express';
import { dollars, paginate } from '../format.js';
import { logger } from '../logger.js';
import { moviesDb, ratingsDb } from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = paginate(req.query.page);

  moviesDb.all(
    `SELECT imdbId, title, genres, releaseDate, budget
     FROM movies LIMIT ? OFFSET ?`,
    [limit, offset],
    (err, rows) => {
      if (err) {
        logger.error(err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json(rows.map(r => ({ ...r, budget: dollars(r.budget) })));
    }
  );
});

router.get('/:imdb', (req, res) => {
  const imdbId = req.params.imdb;

  moviesDb.get(`SELECT * FROM movies WHERE imdbId = ?`, [imdbId], (err, movie) => {
    if (err) {
      logger.error(err.message);
      return res.status(500).json({ error: 'Internal Error' });
    }

    if (!movie) return res.status(404).json({ error: 'Not found' });

    ratingsDb.get(
      `SELECT AVG(rating) as avg FROM ratings WHERE movieId = ?`,
      [movie.movieId],
      (err, ratingRow) => {
        const avg = ratingRow?.avg ? Number(ratingRow.avg).toFixed(2) : null;

        res.json({
          imdbId: movie.imdbId,
          title: movie.title,
          description: movie.overview,
          releaseDate: movie.releaseDate,
          budget: dollars(movie.budget),
          runtime: movie.runtime,
          averageRating: avg,
          genres: movie.genres?.split('|') || [],
          originalLanguage: movie.language,
          productionCompanies: movie.productionCompanies?.split('|') || []
        });
      }
    );
  });
});

export default router;
