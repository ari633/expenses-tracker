import { ExpenseModel } from '@/lib/server/repositories/expenses';
import { verifySession } from '@/lib/server/session';
import { parse } from 'json2csv';

export async function GET() {
  const session = await verifySession()
  const expenses = await ExpenseModel.getAllMyExpenses(session?.userId as number)
  
  const data = {
    expenses
  };

  const csv = parse(data.expenses);
  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=expenses.csv'
    },
  })
}