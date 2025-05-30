import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../../src/config/db.js', () => ({
  moviesDb: {
    all: jest.fn()
  }
}));

const { default: byGenreRouter } = await import('../../src/routes/byGenre.js');
const { moviesDb } = await import('../../src/config/db.js');

const app = express();
app.use('/movies/genre', byGenreRouter);

describe('GET /movies/genre/:genre', () => {
  it('returns movies matching the genre', async () => {
    moviesDb.all.mockImplementation((query, params, cb) => cb(null, [
      {
        imdbId: 'tt2222222',
        title: 'Genre Movie',
        genres: 'Comedy|Drama',
        releaseDate: '2021-07-01',
        budget: 3000000
      }
    ]));

    const res = await request(app).get('/movies/genre/Comedy');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].genres).toContain('Comedy');
    expect(res.body[0].budget).toBe('$3,000,000');
  });
});
