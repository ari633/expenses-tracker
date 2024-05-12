import db from "../db/db";

export interface Expense {
  id?: number;
  category_id: number;
  user_id: number;
  category_name?: string;
  date: string;
  amount: number;
}

const ExpenseModel = {

  deleteMyExpenses: ({
    user_id,
    id,
  }: {user_id: number, id: number}): Promise<any> => {
    const query = `DELETE FROM expenses WHERE id = ? AND user_id = ?`;
    return new Promise((resolve, reject) => {
      db.run(query, [id, user_id], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      });
    })
  },

  insertExpenses: ({
    category_id,
    user_id,
    date,
    amount,
  }: Expense): Promise<number> => {
    const sql =
      "INSERT INTO expenses (category_id, user_id, date, amount) VALUES (?, ?, ?, ?)";
    const values = [category_id, user_id, date, amount];

    return new Promise((resolve, reject) => {
      db.run(sql, values, function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  },

  getAllMyExpenses: (userId: number): Promise<Expense[] | unknown[]> => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT e.id, e.date, e.amount, e.category_id, c.name as category_name
          FROM expenses e 
          JOIN categories c ON e.category_id = c.id
          WHERE e.user_id = ? 
          ORDER BY e.id DESC`,
        [userId],
        (err: any, rows: Expense[]) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  },
  // Implement other CRUD operations as needed
};

export { ExpenseModel };
