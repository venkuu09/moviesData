const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'C:/Users/mailt/Downloads/movie-api/movie-api/src/db/movies.db'), (err) => {
  if (err) console.error('Failed to connect to movies.db:', err.message);
  else {
    console.log('Connected to movies.db');
    db.run(`ATTACH DATABASE '${path.resolve(__dirname, 'C:/Users/mailt/Downloads/movie-api/movie-api/src/db/ratings.db')}' AS ratingsDb`, (err) => {
      if (err) console.error('Failed to attach ratings.db:', err.message);
      else console.log('Connected and Attached ratings.db successfully');
    });
  }
});

module.exports = db;
