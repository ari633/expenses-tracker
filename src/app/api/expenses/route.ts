import { ExpenseModel } from "@/lib/server/repositories/expenses";
import { verifySession } from '@/lib/server/session';

export async function POST(req: any) {
  const { amount, date, category_id } = await req.json();
  const session = await verifySession()
  const expenses = await ExpenseModel.insertExpenses({amount: amount, user_id: session?.userId as number, category_id: category_id, date: date})

  return Response.json({ expenses })
}

export async function GET(req: any) {
  const session = await verifySession()
  const expenses = await ExpenseModel.getAllMyExpenses(session?.userId as number)


  return Response.json({ expenses })
}

export async function DELETE(req: any) {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))
  const session = await verifySession()
  const expenses = await ExpenseModel.deleteMyExpenses({user_id: session?.userId as number, id: id})

  return Response.json({ expenses })
}