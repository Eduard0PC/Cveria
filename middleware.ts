import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        verifyToken(token)
    } catch (error) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete({
            name: 'token',
            path: '/',
        })
        return response
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!login|register|api).*)'], // aplica a todo excepto login, register y api
}
