import { CategoryModel } from "@/lib/server/repositories/categories";
import { verifySession } from '@/lib/server/session';

export async function POST(req: any) {
  const { name } = await req.json();
  const session = await verifySession()
  const category = await CategoryModel.insertCategory({name: name, user_id: session?.userId as number})

  return Response.json({ category })
}

export async function GET(req: any) {
  const session = await verifySession()
  const categories = await CategoryModel.getMyCategory(session?.userId as number)


  return Response.json({ categories })
}