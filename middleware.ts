import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const pathname = request.nextUrl.pathname

    // Definir rutas protegidas
    const protectedPaths = ['/']

    if (protectedPaths.includes(pathname)) {
        // Si no hay token, redirigir a login
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // Si hay token, verificarlo
        try {
            verifyToken(token)
        } catch (error) {
            // Token inválido o expirado: redirigir a login y borrar cookie
            const response = NextResponse.redirect(new URL('/login', request.url))
            response.cookies.delete({
                name: 'token',
                path: '/',
            })
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/'], // rutas protegidas
}
