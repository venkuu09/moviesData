import express from 'express';
import { moviesDb } from '../config/db.js';
import { dollars, paginate } from '../format.js';

const router = express.Router();

router.get('/:genre', (req, res) => {
  const { genre } = req.params;
  const { limit, offset } = paginate(req.query.page);

  moviesDb.all(
    `SELECT imdbId, title, genres, releaseDate, budget
     FROM movies
     WHERE genres LIKE '%' || ? || '%'
     LIMIT ? OFFSET ?`,
    [genre, limit, offset],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Internal error' });
      res.json(rows.map(m => ({ ...m, budget: dollars(m.budget) })));
    }
  );
});

export default router;
