'use client'
import { useEffect, useState } from 'react'

export default function ResultsPage() {
  const [resultado, setResultado] = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('resultadoIA')
    if (stored) setResultado(stored)
  }, [])

  return (
    <main className="min-h-screen px-6 py-10 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Resultado del Análisis</h1>

      {resultado ? (
        <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg whitespace-pre-wrap max-w-4xl w-full">
          {resultado}
        </pre>
      ) : (
        <p className="text-gray-500">No hay resultado para mostrar.</p>
      )}
    </main>
  )
}
