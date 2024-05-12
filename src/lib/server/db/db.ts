import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('/tmp/expenses.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
    return;
  }
  console.log('Connected to the SQLite database.');
});

export default db;