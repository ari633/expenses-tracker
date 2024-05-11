const sqlite3 = require('sqlite3').verbose();


function initialize() {
  const db = new sqlite3.Database('./expenses.db', (err) => {
    if (err) {
      console.error('Error opening database', err);
      return;
    }
    console.log('Connected to the SQLite database.');
  });

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
      )
    `);

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
    })
  });

}

console.log("SEED DB")
initialize();

