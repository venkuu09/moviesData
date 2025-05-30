# moviesData

# Movie API

This is a REST API built with Node.js and Express, using SQLite3 for data storage. It serves movie data and supports filtering by year or genre.

## Prerequisites
- Node.js and npm
- SQLite3

## Endpoints

- `GET /api/movies?page=1`
- `GET /api/movies/details/:imdb_id`
- `GET /api/movies/year/:year?page=1`
- `GET /api/movies/genre/:genre?page=1`

