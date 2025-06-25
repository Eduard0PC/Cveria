import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// secret a formato Uint8Array (se requiere jose)
const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  console.log('Token recibido:', token)

  if (!token) {
    console.log('No hay token, redirigiendo')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, secret)
    console.log('Token válido:', payload)
  } catch (error) {
    console.error('Token inválido:', error)
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('token')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/home']
}
