'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginImage from '@/app/components/LoginImage'

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login'
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(isRegister ? { email, password, name } : { email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('token', data.token)
      setMessage(`Bienvenido, ${data.name || email}!`)
      // router.push('/dashboard')
    } else {
      setMessage(data.error || 'Error en el formulario')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center">
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
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
            {isRegister ? 'Registrarse' : 'Iniciar sesión'}
          </h2>

          {isRegister && (
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

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

          {isRegister && (
            <input
              type="password"
              placeholder="Repetir contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {isRegister && confirmPassword && password !== confirmPassword && (
            <p className="text-sm text-red-500 -mt-4">Las contraseñas no coinciden</p>
          )}

          <button
            type="submit"
            disabled={isRegister && password !== confirmPassword}
            className={`w-full py-2 rounded-lg transition-all shadow-md ${isRegister && password !== confirmPassword
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:brightness-110'
              }`}
          >
            {isRegister ? 'Registrarse' : 'Iniciar sesión'}
          </button>

          {message && (
            <p className="text-sm text-center text-red-500 dark:text-red-400">{message}</p>
          )}

          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
            {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-green-600 hover:underline"
            >
              {isRegister ? 'Inicia sesión' : 'Presiona aquí'}
            </button>
          </p>
        </form>
      </div>

      <LoginImage />
    </div>
  )
}
