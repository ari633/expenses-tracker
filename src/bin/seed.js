const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

async function initialize() {
  const db = new sqlite3.Database('/tmp/expenses.db', (err) => {
    if (err) {
      console.error('Error opening database', err);
      return;
    }
    console.log('Connected to the SQLite database.');
  });

  const hashedPassword = await bcrypt.hash('123456', 10);

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
      )
    `, (err) => {
      if(err) {
        return console.error('ERR', err.message);
      }
      const insertUser = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
      db.run(insertUser, ['admin', hashedPassword, 'admin'], (err) => {
        if (err) {
          return console.error('ERR', err.message);
        }
        console.log(`Added user`);
      });

    });

    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        user_id INTEGER DEFAULT NULL,
        name TEXT,
        FOREIGN KEY (user_id) REFERENCES user(id)
      )
    `, (err) => {
      if (err) {
        return console.error(err.message);
      }

      const insertUser = `INSERT INTO categories (name) VALUES (?)`;
      db.run(insertUser, ['Groceries'], (err) => {
        if (err) {
          return console.error('ERR', err.message);
        }
        console.log(`Added cat item`);
      });
      db.run(insertUser, ['Utilities'], (err) => {
        if (err) {
          return console.error('ERR', err.message);
        }
        console.log(`Added cat item`);
      });

      db.run(`
        CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY,
          user_id INTEGER,
          category_id INTEGER,
          amount TEXT,
          date TEXT,
          FOREIGN KEY (category_id) REFERENCES categories(id),
          FOREIGN KEY (user_id) REFERENCES user(id)
        );      
      `);
    });
  });

}

console.log("SEED DB")
initialize();

