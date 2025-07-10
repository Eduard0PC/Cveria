import { NextResponse } from 'next/server'
import { analizarConOpenRouter } from '@/lib/ia'

type AnswersType = {
  nombre: string
  contacto: { tipo: string; valor: string }[]
  perfil: string
  experiencia: { puesto: string; empresa: string; descripcion: string }[]
  educacion: { titulo: string; institucion: string }[]
  habilidades: string[]
  fortalezas: string[]
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { answers, context } = body as { answers: AnswersType; context: string }

    const prompt = generarPrompt(answers, context)
    const response = await analizarConOpenRouter(prompt)

    const cvMejorado = JSON.parse(response);

    return NextResponse.json({ cv: cvMejorado })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function generarPrompt(answers: AnswersType, context: string): string {
  return `
Eres un experto en redacción profesional de currículums.

Toma la siguiente información ingresada por un usuario y reescríbela completamente para que suene profesional, clara y atractiva. Devuelve únicamente el resultado como un objeto JSON con la siguiente estructura EXACTA:

{
  "nombre": "...",
  "contacto": [ { "tipo": "...", "valor": "..." }, ... ],
  "perfil": "...",
  "experiencia": [ { "puesto": "...", "empresa": "...", "descripcion": "..." }, ... ],
  "educacion": [ { "titulo": "...", "institucion": "..." }, ... ],
  "habilidades": ["...", "..."],
  "fortalezas": ["...", "..."]
}

Mantén la estructura de los datos, pero reescribe los textos para mejorar su presentación.

Puesto objetivo: ${context || 'No especificado'}

Nombre original: ${answers.nombre}
Contacto original: ${answers.contacto.map(c => `${c.tipo}: ${c.valor}`).join(', ')}

Perfil profesional original:
${answers.perfil}

Experiencia laboral original:
${answers.experiencia.length ? answers.experiencia.map(e => `${e.puesto} en ${e.empresa}: ${e.descripcion}`).join('\n') : 'Sin experiencia'}

Educación original:
${answers.educacion.length ? answers.educacion.map(e => `${e.titulo} en ${e.institucion}`).join('\n') : 'No especificada'}

Habilidades originales:
${answers.habilidades.join(', ') || 'No indicadas'}

Fortalezas o logros originales (ADEMAS Describe de manera mas prolongada fortalezas o logros relevantes):
${answers.fortalezas.join(', ') || 'No indicadas'}

Devuelve solo el JSON mejorado. No escribas explicaciones, ni comentarios, ni encabezados.
`
}
