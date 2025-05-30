import express from 'express';
import { moviesDb } from '../config/db.js';
import { dollars, paginate } from '../format.js';
import { logger } from '../logger.js';

const router = express.Router();

router.get('/:year', (req, res) => {
  const { year } = req.params;
  const desc = req.query.desc === 'true';
  const { limit, offset } = paginate(req.query.page);

  moviesDb.all(
    `SELECT imdbId, title, genres, releaseDate, budget
     FROM movies
     WHERE strftime('%Y', releaseDate) = ?
     ORDER BY releaseDate ${desc ? 'DESC' : 'ASC'}
     LIMIT ? OFFSET ?`,
    [year, limit, offset],
    (err, rows) => {
      if (err) {
        logger.error(err.message);
        return res.status(500).json({ error: 'DB error' });
      }
      res.json(rows.map(m => ({ ...m, budget: dollars(m.budget) })));
    }
  );
});

export default router;
