'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    console.log(data);

    if (res.ok) {
      localStorage.setItem('token', data.token)
      setMessage(`Bienvenido, ${data.name || email}!`)
    } else {
      setMessage(data.error || 'Error al iniciar sesión')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Iniciar sesión</button>
      {message && <p>{message}</p>}
    </form>
  )
}
