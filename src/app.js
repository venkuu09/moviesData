import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import movies from './routes/movies.js';
import byYear from './routes/byYear.js';
import byGenre from './routes/byGenre.js';

const app = express();

app.use(express.json());
app.use('/movies', movies);
app.use('/movies/year', byYear);
app.use('/movies/genre', byGenre);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
