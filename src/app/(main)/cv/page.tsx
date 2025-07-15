'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Listbox } from '@headlessui/react'
import CVone from '@/app/components/cvone'
import CVtwo from '@/app/components/cvtwo'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

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
  const [analisis, setAnalisis] = useState<string | null>(null)
  const [porcentaje, setPorcentaje] = useState<number | null>(null)
  const [animatedValue, setAnimatedValue] = useState<number>(0)
  const [mostrarAnalisis, setMostrarAnalisis] = useState<boolean>(false)
  const [correcciones, setCorrecciones] = useState('')
  const [corrigiendo, setCorrigiendo] = useState(false)
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

  useEffect(() => {
    if (!cv) return
    const analizarCV = async () => {
      const fakeFile = new File([JSON.stringify(cv, null, 2)], 'cv.txt', { type: 'text/plain' })
      const formData = new FormData()
      formData.append('cv', fakeFile)
      formData.append('context', '')

      const response = await fetch('/api/checkcv', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        const data = await response.json()
        setAnalisis(data.result)
        const match = data.result.match(/Porcentaje de aprobación:\s*(\d{1,3})%/)
        if (match) setPorcentaje(parseInt(match[1]))
      }
    }
    analizarCV()
  }, [cv])

  // Animación del porcentaje
  useEffect(() => {
    if (porcentaje !== null) {
      let start = 0
      const duration = 1000
      const increment = Math.ceil(porcentaje / (duration / 20))
      const interval = setInterval(() => {
        start += increment
        if (start >= porcentaje) {
          setAnimatedValue(porcentaje)
          clearInterval(interval)
        } else {
          setAnimatedValue(start)
        }
      }, 20)
      return () => clearInterval(interval)
    }
  }, [porcentaje])

  // Animación de sugerencias
  useEffect(() => {
    if (analisis) {
      const timeout = setTimeout(() => setMostrarAnalisis(true), 600)
      return () => clearTimeout(timeout)
    }
  }, [analisis])

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

  async function aplicarCorrecciones() {
    if (!cv || !correcciones.trim()) return
    setCorrigiendo(true)
    try {
      const res = await fetch('/api/generatecv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: cv, context: '', correcciones }),
      })
      const data = await res.json()
      if (res.ok) {
        setCV(data.cv)
        sessionStorage.setItem('contenidoCV', JSON.stringify(data.cv)) 
        setCorrecciones('')
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      alert('Error al aplicar correcciones')
    } finally {
      setCorrigiendo(false)
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

      <div className="print:hidden">
        {porcentaje !== null && (
          <div className="w-40 h-40 sm:w-50 sm:h-50 lg:w-100 lg:h-100 my-10 mx-auto">
            <CircularProgressbar
              value={animatedValue}
              text={`${animatedValue}%`}
              styles={buildStyles({
                textSize: '16px',
                pathColor: `rgba(${porcentaje >= 50 ? 34 : 59}, ${porcentaje >= 50 ? 197 : 130}, ${porcentaje >= 50 ? 94 : 246}, ${animatedValue / 100})`,
                textColor: '',
                trailColor: 'rgba(0, 0, 0, 0.1)',
                backgroundColor: 'transparent',
              })}
            />
            <p className="text-center mt-2 text-sm text-gray-800 dark:text-gray-300">Aprobación del CV</p>
          </div>
        )}

        {analisis ? (
          <pre
            className={`
            bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded-lg whitespace-pre-wrap max-w-4xl w-full shadow-md
            transform transition-all duration-700 ease-out
            ${mostrarAnalisis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
            mx-auto mb-8
          `}
          >
            {analisis}
          </pre>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center mb-4">Cargando Análisis...</p>
        )}
      </div>

      <div className="print:hidden max-w-3xl mx-auto mb-8">
        <label className="block mb-2 font-semibold">¿Qué correcciones quieres que la IA haga al CV?</label>
        <textarea
          value={correcciones}
          onChange={e => setCorrecciones(e.target.value)}
          placeholder="Escribe aquí tus correcciones o cambios deseados..."
          className="border p-2 w-full mb-2"
          rows={5}
        />
      </div>

      <div className="print:hidden flex justify-center mt-8 mb-8 gap-4">
        <button
          onClick={() => router.push('/generateCV')}
          className="bg-gray-400 hover:bg-gray-600 px-4 py-2 rounded"
        >
          Volver
        </button>
        {correcciones.trim() ? (
          <button
            onClick={aplicarCorrecciones}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={corrigiendo}
          >
            {corrigiendo ? 'Aplicando...' : 'Aplicar correcciones'}
          </button>
        ) : (
          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Imprimir / Guardar PDF
          </button>
        )}
      </div>
    </div>
  )
}
