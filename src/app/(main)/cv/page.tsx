'use client'
import { useEffect, useState } from 'react'
import CVone from '@/app/components/cvone'

type AnswersType = {
  nombre: string
  contacto: { tipo: string; valor: string }[]
  perfil: string
  experiencia: { puesto: string; empresa: string; descripcion: string }[]
  educacion: { titulo: string; institucion: string }[]
  habilidades: string[]
  fortalezas: string[]
}

export default function CVPage() {
  const [cv, setCV] = useState<AnswersType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('contenidoCV')
      if (!stored) throw new Error('CV no encontrado')

      const parsed = JSON.parse(stored)
      setCV(parsed)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) return <div className="text-center py-20">Cargando CV...</div>
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>
  if (!cv) return null

  return (
    <div>
      <CVone cv={cv} />
      <div className="flex justify-center mb-8 gap-4">
        <button
          onClick={() => window.history.back()}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Volver
        </button>
        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Imprimir / Guardar PDF
        </button>
      </div>
    </div>
  )
}
