import db from "../db/db";

interface Expense {
  id: number;
  description: string;
  amount: number;
}

const ExpenseModel = {
  getAll: (): Promise<Expense[] | unknown[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM expenses', (err, rows) => {
        if (err) reject(err);
        console.log("rows", rows);
        resolve(rows);
      });
    });
  },
  // Implement other CRUD operations as needed
};


export {
  ExpenseModel
}
