'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function QuestionsPage() {
    const router = useRouter()

    const [step, setStep] = useState(0)

    const [answers, setAnswers] = useState({
        nombre: '',
        contacto: [] as { tipo: string; valor: string }[],
        perfil: '',
        experiencia: [] as { puesto: string; empresa: string; descripcion: string }[],
        educacion: [] as { titulo: string; institucion: string }[],
        habilidades: [] as string[],
        fortalezas: [] as string[]
    })

    const [context, setContext] = useState('')

    const agregarElemento = <T,>(campo: keyof typeof answers, nuevo: T) => {
        setAnswers(prev => ({
            ...prev,
            [campo]: [...(prev[campo] as T[]), nuevo]
        }))
    }

    const actualizarElemento = <T,>(
        campo: keyof typeof answers,
        index: number,
        subcampo: keyof T,
        valor: string
    ) => {
        const copia = [...(answers[campo] as T[])]
        copia[index] = { ...copia[index], [subcampo]: valor }
        setAnswers({ ...answers, [campo]: copia })
    }

    const eliminarElemento = (campo: keyof typeof answers, index: number) => {
        const copia = [...(answers[campo] as any[])]
        copia.splice(index, 1)
        setAnswers({ ...answers, [campo]: copia })
    }

    async function generarCV() {
        try {
            const res = await fetch('/api/generatecv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers, context }),
            })

            const data = await res.json()

            if (res.ok) {
                sessionStorage.setItem('contenidoCV', JSON.stringify(data.cv));
                router.push('/cv')
            } else {
                alert('Error: ' + data.error)
            }
        } catch (error) {
            alert('Error al generar el CV')
            console.error(error)
        }
    }


    const steps = [
        <div key="nombre">
            <label className="block mb-2">¿Cuál es tu nombre completo?</label>
            <input
                type="text"
                value={answers.nombre}
                onChange={e => setAnswers({ ...answers, nombre: e.target.value })}
                className="border p-2 w-full"
            />
        </div>,

        <div key="contactos">
            <h3 className="mb-2 font-bold">¿Cómo podemos contactarte?</h3>
            {answers.contacto.map((c, i) => (
                <div key={i} className="flex gap-2 mb-2 items-center">
                    <input
                        placeholder="Tipo (ej. email, teléfono)"
                        className="border p-1 w-1/2"
                        value={c.tipo}
                        onChange={e => actualizarElemento<typeof c>('contacto', i, 'tipo', e.target.value)}
                    />
                    <input
                        placeholder="Valor (ej. usuario@gmail.com)"
                        className="border p-1 w-1/2"
                        value={c.valor}
                        onChange={e => actualizarElemento<typeof c>('contacto', i, 'valor', e.target.value)}
                    />
                    <button
                        onClick={() => eliminarElemento('contacto', i)}
                        className="text-red-500 hover:text-red-700 text-xl px-2"
                        title="Eliminar"
                    >
                        X
                    </button>
                </div>
            ))}
            <button
                onClick={() => agregarElemento('contacto', { tipo: '', valor: '' })}
                className="bg-blue-500 text-white px-3 py-1 rounded"
            >
                + Agregar contacto
            </button>
        </div>,

        <div key="perfil">
            <label className="block mb-2">Describe tu perfil profesional:</label>
            <textarea
                value={answers.perfil}
                onChange={e => setAnswers({ ...answers, perfil: e.target.value })}
                className="border p-2 w-full"
            />
        </div>,

        <div key="experiencia">
            <h3 className="mb-2 font-bold">Experiencia laboral</h3>
            {answers.experiencia.map((exp, i) => (
                <div key={i} className="mb-4 border p-4 pt-10 rounded relative">
                    <button
                        onClick={() => eliminarElemento('experiencia', i)}
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                        title="Eliminar"
                    >
                        X
                    </button>
                    <input
                        placeholder="Puesto"
                        className="block w-full mb-1 border p-1"
                        value={exp.puesto}
                        onChange={e => actualizarElemento<typeof exp>('experiencia', i, 'puesto', e.target.value)}
                    />
                    <input
                        placeholder="Empresa"
                        className="block w-full mb-1 border p-1"
                        value={exp.empresa}
                        onChange={e => actualizarElemento<typeof exp>('experiencia', i, 'empresa', e.target.value)}
                    />
                    <textarea
                        placeholder="Descripción"
                        className="block w-full border p-1"
                        value={exp.descripcion}
                        onChange={e => actualizarElemento<typeof exp>('experiencia', i, 'descripcion', e.target.value)}
                    />
                </div>
            ))}
            <button
                onClick={() => agregarElemento('experiencia', { puesto: '', empresa: '', descripcion: '' })}
                className="bg-blue-500 text-white px-3 py-1 rounded"
            >
                + Agregar experiencia
            </button>
        </div>,

        <div key="educacion">
            <h3 className="mb-2 font-bold">Educación</h3>
            {answers.educacion.map((edu, i) => (
                <div key={i} className="mb-4 border p-4 pt-10 rounded relative">
                    <button
                        onClick={() => eliminarElemento('educacion', i)}
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                        title="Eliminar"
                    >
                        X
                    </button>
                    <input
                        placeholder="Título"
                        className="block w-full mb-1 border p-1"
                        value={edu.titulo}
                        onChange={e => actualizarElemento<typeof edu>('educacion', i, 'titulo', e.target.value)}
                    />
                    <input
                        placeholder="Institución"
                        className="block w-full border p-1"
                        value={edu.institucion}
                        onChange={e => actualizarElemento<typeof edu>('educacion', i, 'institucion', e.target.value)}
                    />
                </div>
            ))}
            <button
                onClick={() => agregarElemento('educacion', { titulo: '', institucion: '' })}
                className="bg-blue-500 text-white px-3 py-1 rounded"
            >
                + Agregar educación
            </button>
        </div>,

        <div key="habilidades">
            <label className="block mb-2">Lista tus habilidades (separadas por coma):</label>
            <input
                type="text"
                value={answers.habilidades.join(', ')}
                onChange={e =>
                    setAnswers({ ...answers, habilidades: e.target.value.split(',').map(h => h.trim()) })
                }
                className="border p-2 w-full"
            />
        </div>,
        <div key="fortalezas">
            <label className="block mb-2">Lista tus fortalezas o logros (separadas por coma):</label>
            <input
                type="text"
                value={answers.fortalezas.join(', ')}
                onChange={e =>
                    setAnswers({ ...answers, fortalezas: e.target.value.split(',').map(h => h.trim()) })
                }
                className="border p-2 w-full"
            />
        </div>,
        <div key="jobContext">
            <label className="block mb-2"><strong>(Opcional)Describe brevemente para qué puesto estás aplicando (Ayuda a dar resutados mas específicos) </strong>:</label>
            <textarea
                onChange={(e) => setContext(e.target.value)}
                placeholder="Escribe aquí el puesto o descríbelo..."
                className="border p-2 w-full"
            />
        </div>
    ]

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-2xl w-full mx-auto border p-10 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                <h2 className="text-3xl sm:text-5xl text-center font-bold px-2">
                    <strong>Antes de nada...</strong>
                </h2>
                <p className="text-lg text-center mt-4 mb-4 px-2">
                    Por favor, contesta estas preguntas para generar tu CV.
                </p>

                {steps[step]}

                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => setStep(p => Math.max(0, p - 1))}
                        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                        disabled={step === 0}
                    >
                        Anterior
                    </button>
                    {step < steps.length - 1 ? (
                        <button
                            onClick={() => setStep(p => p + 1)}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Siguiente
                        </button>
                    ) : (
                        <button
                            onClick={generarCV}
                            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded"
                        >
                            Finalizar
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
