const db = require('../config/db');

exports.getAllMovies = (page = 1, limit = 50) => {
  const offset = (page - 1) * limit;
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT 
         imdbId, 
         title, 
         genres, 
         releaseDate, 
         printf('$%.2f', budget) AS budget
       FROM movies
       ORDER BY releaseDate ASC
       LIMIT ? OFFSET ?;`,
      [limit, offset],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

exports.getMovieDetails = (imdbId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        m.imdbId,
        m.title,
        m.overview AS description,
        m.releaseDate AS release_date,
        printf('$%.2f', m.budget) AS budget,
        m.runtime,
        (
          SELECT ROUND(AVG(r.rating), 2)
          FROM ratingsDb.ratings r
          WHERE r.movieId = m.movieId
        ) AS average_rating,
        m.genres,
        m.language as original_language,
        m.productionCompanies as production_companies
        
      FROM movies m
      WHERE m.imdbId = ?;
    `;
    db.get(query, [imdbId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

exports.getMoviesByYear = (year, page = 1, limit = 50) => {
  const offset = (page - 1) * limit;
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        imdbId, 
        title, 
        genres, 
        releaseDate as release_date, 
        printf('$%.2f', budget) AS budget
      FROM movies
      WHERE strftime('%Y', releaseDate) = ?
      ORDER BY releaseDate ASC
      LIMIT ? OFFSET ?;
    `;
    db.all(query, [year, limit, offset], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.getMoviesByGenre = (genre, page = 1, limit = 50) => {
  const offset = (page - 1) * limit;
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        imdbId, 
        title, 
        genres, 
        releaseDate AS release_date, 
        printf('$%.2f', budget) AS budget
      FROM movies
      WHERE genres LIKE ?
      ORDER BY releaseDate ASC
      LIMIT ? OFFSET ?;
    `;
    db.all(query, [`%${genre}%`, limit, offset], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};
