'use client'
import { useEffect, useState, useRef } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useRouter } from 'next/navigation'

export default function ResultsPage() {
  const [resultado, setResultado] = useState<string | null>(null)
  const [porcentaje, setPorcentaje] = useState<number | null>(null)
  const [animatedValue, setAnimatedValue] = useState<number>(0)
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const stored = sessionStorage.getItem('resultadoIA')
    if (stored) {
      setResultado(stored)
      const match = stored.match(/Porcentaje de aprobación:\s*(\d{1,3})%/)
      if (match) {
        const value = parseInt(match[1])
        setPorcentaje(value)
      }
    }
  }, [])

  //Animacion del porcentaje
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

  // Animacion resultado
  useEffect(() => {
    if (resultado) {
      const timeout = setTimeout(() => {
        setMostrarResultado(true)
      }, 600) 

      return () => clearTimeout(timeout)
    }
  }, [resultado])

  return (
    <main className="min-h-screen px-6 py-10 flex flex-col items-center justify-center">
      <h1 className="text-3xl sm:text-5xl text-center font-bold mt-20 px-2 ">
        <strong>Resultado del análisis</strong>
      </h1>

      {porcentaje !== null && (
        <div className="w-40 h-40 sm:w-50 sm:h-50 lg:w-100 lg:h-100 my-10">
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

      {resultado ? (
        <pre
          className={`
            bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded-lg whitespace-pre-wrap max-w-4xl w-full shadow-md
            transform transition-all duration-700 ease-out
            ${mostrarResultado ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
          `}
        >
          {resultado}
        </pre>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No hay resultado para mostrar.</p>
      )}

      <button
        className="cursor-pointer mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded hover:bg-radial w-full max-w-xs sm:max-w-fit"
        onClick={() => router.push('/checkCV')}
      >
        Analizar otro CV
      </button>
    </main>
  )
}
