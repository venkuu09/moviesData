import dotenv from 'dotenv';
dotenv.config();

const express = require('express');
const app = express();
const movieRoutes = require('./routes/movieRoutes');

app.use(express.json());
app.use('/api', movieRoutes);

const PORT = process.env.PORT || 3000;
// Server connected to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Welcome to the MOVIE API');
});