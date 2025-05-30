import express from 'express';
import dotenv from 'dotenv';
import movies from './routes/movies.js';
import byYear from './routes/byYear.js';
import byGenre from './routes/byGenre.js';
import { logger } from './logger.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.disable('x-powered-by');

app.use('/movies', movies);
app.use('/movies/year', byYear);
app.use('/movies/genre', byGenre);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

app.listen(PORT, () => {
  logger.info(`🎬 Movie API running at http://localhost:${PORT}`);
});
