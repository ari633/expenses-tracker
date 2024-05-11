import db from "../db/db";

export interface Category {
  name: string;
  user_id?: number;
}

const CategoryModel = { 
  insertCategory: ({name, user_id}: Category): Promise<number> => {
    const sql = 'INSERT INTO categories (name, user_id) VALUES (?, ?)';
    const values = [name, user_id ? user_id : null];
    
    return new Promise((resolve, reject) => {
      db.run(sql, values, function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID)
      });
    });
  },

  getMyCategory: (userId: number): Promise<Category[] | unknown[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT name FROM categories WHERE user_id = ? OR user_id IS NULL ORDER BY id DESC', [userId], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
}

export {
  CategoryModel
}