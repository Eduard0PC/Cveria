import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { signToken } from '@/lib/auth'
import db from '@/lib/db'
import { setAuthCookie } from '@/lib/cookies'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 }) // usar NextResponse
  }

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 }) // usar NextResponse
    }

    const token = signToken({ id: user.id, name: user.name, email: user.email })

    const response = NextResponse.json({
      message: `Bienvenido, ${user.name}!`,
      token,
      user: { id: user.id, name: user.name, email: user.email }
    })

    setAuthCookie(response, token)

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 }) // usar NextResponse
  }
}
