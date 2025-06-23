import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie') || ''
  const tokenMatch = cookieHeader.match(/token=([^;]+)/)
  const token = tokenMatch?.[1]

  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const user = verifyToken(token)
    return NextResponse.json({ user })
  } catch (err) {
    console.error('Error al verificar token:', err)
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }
}
