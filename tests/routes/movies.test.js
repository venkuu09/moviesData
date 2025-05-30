import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../../src/config/db.js', () => ({
  moviesDb: {
    all: jest.fn(),
    get: jest.fn()
  },
  ratingsDb: {
    get: jest.fn()
  }
}));

const { default: moviesRouter } = await import('../../src/routes/movies.js');
const { moviesDb, ratingsDb } = await import('../../src/config/db.js');

const app = express();
app.use('/movies', moviesRouter);

describe('GET /movies', () => {
  it('returns paginated list of movies', async () => {
    moviesDb.all.mockImplementation((query, params, cb) => cb(null, [
      {
        imdbId: 'tt1234567',
        title: 'Test Movie',
        genres: 'Drama',
        releaseDate: '2022-01-01',
        budget: 1000000
      }
    ]));

    const res = await request(app).get('/movies');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        imdbId: 'tt1234567',
        title: 'Test Movie',
        genres: 'Drama',
        releaseDate: '2022-01-01',
        budget: '$1,000,000'
      }
    ]);
  });
});

describe('GET /movies/:imdbId', () => {
  it('returns movie details with average rating', async () => {
    moviesDb.get.mockImplementationOnce((query, param, cb) => cb(null, {
      movieId: 1,
      imdbId: 'tt1234567',
      title: 'Detail Movie',
      overview: 'A movie about testing.',
      releaseDate: '2022-01-01',
      budget: 5000000,
      runtime: 120,
      genres: 'Drama|Action',
      language: 'en',
      productionCompanies: 'Test Studio'
    }));

    ratingsDb.get.mockImplementationOnce((query, param, cb) => cb(null, {
      avg: 7.5
    }));

    const res = await request(app).get('/movies/tt1234567');
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      imdbId: 'tt1234567',
      title: 'Detail Movie',
      averageRating: '7.50',
      budget: '$5,000,000'
    });
  });

  it('returns 404 if movie not found', async () => {
    moviesDb.get.mockImplementationOnce((query, param, cb) => cb(null, null));
    const res = await request(app).get('/movies/tt0000000');
    expect(res.statusCode).toBe(404);
  });
});
