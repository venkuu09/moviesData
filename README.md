# moviesData

# Movie API

This is a REST API built with Node.js and Express, using SQLite3 for data storage. It serves movie data and supports filtering by year or genre.

## Prerequisites
- Node.js and npm
- SQLite3 database

## Running the API

### Using `server.js` (recommended)

- Start the server: npm start or node src/server.js
- API runs on http://localhost:3000

#### API Endpoints

| HTTP Method | URL                           | Description                      |
| ----------- | ----------------------------- | -------------------------------- |
| GET         | `/movies?page=1`              | List all movies (paginated)      |
| GET         | `/movies/:imdb`               | Get movie details by IMDb ID     |
| GET         | `/movies/year/:year?page=1`   | List movies from a specific year |
| GET         | `/movies/genre/:genre?page=1` | List movies by genre             |

#### Example URLs

- Movies by page: http://localhost:3000/movies?page=1
- Movies by ImdbId: http://localhost:3000/movies/tt0109830
- Movies by year: http://localhost:3000/movies/year/2016?page=1
- Movies by genre: http://localhost:3000/movies/genre/Action?page=1

### Using `app.js` 

- Start the server: node src/app.js
- API runs on http://localhost:3000

| HTTP Method | URL                               | Description                      |
| ----------- | --------------------------------- | -------------------------------- |
| GET         | `/api/movies?page=1`              | List all movies (paginated)      |
| GET         | `/api/movies/details/:imdb_id`    | Get movie details by IMDb ID     |
| GET         | `/api/movies/year/:year?page=1`   | List movies from a specific year |
| GET         | `/api/movies/genre/:genre?page=1` | List movies by genre             |

#### Example URLs:

- Movies by page: http://localhost:3000/api/movies?page=1
- Movies by ImdbId: http://localhost:3000/api/movies/details/tt1234567
- Movies by year: http://localhost:3000/api/movies/year/2020?page=1
- Movies by genre: http://localhost:3000/api/movies/genre/Action?page=1

### Testing API

- Server: npm test

#### Tests cover:
- Getting movie details by IMDb ID
- Fetching paginated movie lists
- Filtering by year and genre
- Handling of invalid input and 404s