'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Listbox } from '@headlessui/react'
import CVone from '@/app/components/cvone'
import CVtwo from '@/app/components/cvtwo'


type AnswersType = {
  nombre: string
  contacto: { tipo: string; valor: string }[]
  perfil: string
  experiencia: { puesto: string; empresa: string; descripcion: string }[]
  educacion: { titulo: string; institucion: string }[]
  habilidades: string[]
  fortalezas: string[]
}

const designs = [
  { name: 'Diseño 1', value: 'cvone', color: 'bg-blue-100 text-blue-900' },
  { name: 'Diseño 2', value: 'cvtwo', color: 'bg-green-100 text-green-900' },
] as const

export default function CVPage() {
  const [cv, setCV] = useState<AnswersType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [Design, setDesign] = useState<'cvone' | 'cvtwo'>('cvone')
  const router = useRouter()

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('contenidoCV')
      if (!stored) throw new Error('CV no encontrado')

      const parsed = JSON.parse(stored)
      setCV(parsed)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error inesperado')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) return <div className="text-center py-20">Cargando CV...</div>
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>
  if (!cv) return null

  const selectedDesign = () => {
    switch (Design) {
      case 'cvone':
        return <CVone cv={cv} />
      case 'cvtwo':
        return <CVtwo cv={cv} />
      default:
        return <CVone cv={cv} />
    }
  }
  return (
    <div>
      <div className="print:hidden flex justify-center mt-32">
        <Listbox value={Design} onChange={setDesign}>
          <div className="relative w-60">
            <Listbox.Button
              className={`w-full px-4 py-2 text-center border rounded font-semibold shadow-sm
                ${designs.find(d => d.value === Design)?.color}
              `}
            >
              {designs.find(d => d.value === Design)?.name}
            </Listbox.Button>
            <Listbox.Options className="absolute w-full mt-1 rounded border shadow-lg z-50">
              {designs.map((design) => (
                <Listbox.Option
                  key={design.value}
                  value={design.value}
                  className={({ active, selected }) =>
                    `cursor-pointer px-4 py-2 ${design.color}
                     ${active ? 'bg-opacity-75' : ''}
                     ${selected ? 'font-bold' : ''}`
                  }
                >
                  {design.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      {selectedDesign()}
      <div className="print:hidden flex justify-center mb-8 gap-4">
        <button
          onClick={() => router.push('/generateCV')}
          className="bg-gray-400 hover:bg-gray-600 px-4 py-2 rounded"
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
