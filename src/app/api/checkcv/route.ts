import { NextResponse } from 'next/server'
import pdfParse from 'pdf-parse'
import { analizarConOpenRouter } from '@/lib/ia'
console.log('>>> Llamando a /api/checkcv');

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('cv') as File
  const context = formData.get('context')?.toString() || ''

  if (!file) {
    return NextResponse.json({ error: 'Archivo no enviado' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const pdfText = (await pdfParse(buffer)).text

  const prompt = `
Tengo el siguiente CV:

${pdfText}

${context ? `El usuario indicó este contexto para el empleo deseado:\n${context}` : ''}

Por favor, analiza el CV y y dime qué frases o secciones puedo mejorar para hacerlo más profesional, 
claro y atractivo para reclutadores. 
Señala ejemplos específicos de frases que debería cambiar, y sugiéreme cómo reescribirlas. 
También dime si falta algo importante según el tipo de puesto al que se dirige..
`

  const result = await analizarConOpenRouter(prompt)
  return NextResponse.json({ result })
}
