import db from "../db/db";

export interface User {
  id?: number;
  username: string;
  password: string;
  role: string;
}

const UserModel = { 

  findByUsername: (username: string): Promise<User | null> => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const values = [username];
  
    return new Promise((resolve, reject) => {
      db.get(sql, values, (err, row: User) => {
        if (err) {
          reject(err);
          return;
        }
        if (!row) {
          resolve(null);
          return;
        }
        resolve(row); 
      });
    });
  },
  insertUser: ({username, password, role}: User): Promise<number> => {
    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    const values = [username, password, role];
    
    return new Promise((resolve, reject) => {
      db.run(sql, values, function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID)
      });
    });
  }
}

export {
  UserModel
}