'use client'
import { useEffect, useState } from "react"

export default function HomePage() {

  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        console.log('data recibida:', data)
        if (data.user) setUser(data.user)
      })
  }, [])

return (
  <main className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold mb-4">Home</h1>
    <p className="text-lg">
      Bienvenido, {user ? user.name : "invitado"}!
    </p>
  </main>
)
}
