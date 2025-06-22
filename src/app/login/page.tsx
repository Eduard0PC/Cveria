'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginImage from '@/app/components/LoginImage'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('token', data.token)
      setMessage(`Bienvenido, ${data.name || email}!`)
      // Redireccionar si es necesario:
      // router.push('/dashboard')
    } else {
      setMessage(data.error || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center ">
      {/* Lado izquierdo: Formulario y textos */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-8 py-12">
        <header className="text-center mb-8">
          <h1 className="text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
            Cveria
          </h1>
          <p className="mt-4 max-w-md text-lg">
            Porque con nosotros importa cómo <strong>cvería</strong> un buen currículum, todo con la ayuda de la IA.
          </p>
        </header>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl space-y-6 transition-all"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">Iniciar sesión</h2>

          <input
            type="email"
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 rounded-lg hover:brightness-110 transition-all shadow-md"
          >
            Iniciar sesión
          </button>

          {message && (
            <p className="text-sm text-center text-red-500 dark:text-red-400">{message}</p>
          )}

          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="text-green-600 hover:underline">
              Presiona aquí
            </a>
          </p>
        </form>
      </div>

      {/* Lado derecho: Imagen */}
      <LoginImage />
    </div>
  );

}
