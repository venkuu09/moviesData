import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const openDb = file =>
  new sqlite3.Database(path.join(__dirname, '..', '..', 'db', file), sqlite3.OPEN_READONLY);

//export const moviesDb = openDb('movies.db');
//export const ratingsDb = openDb('ratings.db');

const dbPath = path.join(__dirname, '..', 'db');
export const moviesDb = new sqlite3.Database(path.join(dbPath, 'movies.db'));
export const ratingsDb = new sqlite3.Database(path.join(dbPath, 'ratings.db'));

