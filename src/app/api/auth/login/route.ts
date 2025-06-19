import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET no está definido');

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret, {
      expiresIn: '1h',
    });

    return Response.json({ token, name: user.name});
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Error al iniciar sesión' }, { status: 500 });
  }
}
