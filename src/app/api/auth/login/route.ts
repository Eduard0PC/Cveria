import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { signToken } from '@/lib/auth';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (typeof email !== 'string' || typeof password !== 'string') {
    return Response.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return Response.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const token = signToken({ id: user.id, name: user.name, email: user.email });
    //Token
    return Response.json({message: `Bienvenido, ${user.name}!`,token, user: { id: user.id, name: user.name, email: user.email }});
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Error al iniciar sesión' }, { status: 500 });
  }
}
