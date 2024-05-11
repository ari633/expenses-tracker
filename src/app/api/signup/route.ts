import bcrypt from 'bcrypt';
import { UserModel } from "@/lib/server/repositories/users";
import { createSession } from '@/lib/server/session';

export async function POST(req: any) {
  const { username, password } = await req.json();

  const checkUsername = await UserModel.findByUsername(username);
  if (checkUsername !== null) {
    return Response.json({ error: "Username Already Taken" })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.insertUser({username: username, password: hashedPassword, role: "user"})

  if (user) {
    await createSession(user);
  }

  return Response.json({ user })
}