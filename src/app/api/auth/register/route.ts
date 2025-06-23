import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server' 
import bcrypt from 'bcrypt';
import { signToken } from '@/lib/auth';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        return Response.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    try {
        //Verificacion de usuario exixtente
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return Response.json({ error: 'El usuario YA existe' }, { status: 409 });
        }

        //Creacion de usuario
        const newUser = ({ name, email, password: await bcrypt.hash(password, 10) });
        const result = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [newUser.name, newUser.email, newUser.password]);

        const user = result.rows[0];
        //Token
        const token = signToken({ id: user.id, name: user.name, email: user.email });

        const response = NextResponse.json({
            message: 'Usuario registrado exitosamente',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        })

        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 // 1 día
        })

        return response
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al registrar usuario' }, { status: 500 })
    }
}