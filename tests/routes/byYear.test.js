import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../../src/config/db.js', () => ({
  moviesDb: {
    all: jest.fn()
  }
}));

const { default: byYearRouter } = await import('../../src/routes/byYear.js');
const { moviesDb } = await import('../../src/config/db.js');

const app = express();
app.use('/movies/year', byYearRouter);

describe('GET /movies/year/:year', () => {
  it('returns movies by year in chronological order', async () => {
    moviesDb.all.mockImplementation((query, params, cb) => cb(null, [
      {
        imdbId: 'tt1111111',
        title: 'Old Movie',
        genres: 'Action',
        releaseDate: '2010-05-01',
        budget: 2500000
      }
    ]));

    const res = await request(app).get('/movies/year/2010');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].budget).toBe('$2,500,000');
    expect(res.body[0].title).toBe('Old Movie');
  });
});
