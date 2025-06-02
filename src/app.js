import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import movieRoutes from './routes/movieRoutes.js';

const app = express();

app.use(express.json());
app.use('/api', movieRoutes);

const PORT = process.env.PORT || 3000;
// Server connected to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Welcome to the MOVIE API');
});