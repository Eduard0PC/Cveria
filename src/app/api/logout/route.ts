import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: "Sesión cerrada" });

  // Borra la cookie del token
  response.cookies.delete({
    name: 'token',
    path: '/',
  });

  return response;
}
