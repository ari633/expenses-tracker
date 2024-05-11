import bcrypt from 'bcrypt';
import { UserModel, User } from "@/lib/server/repositories/users";
import { createSession } from '@/lib/server/session';

export async function POST(req: any) {
  const { username, password } = await req.json();

  const user: User | null = await UserModel.findByUsername(username);
  if (user === null) {
    return Response.json({ error: "User Not Exist" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return Response.json({ error: "Wrong Password" });
  }

  await createSession(user.id)

  return Response.json({ id: user.id, username: user.username })
}