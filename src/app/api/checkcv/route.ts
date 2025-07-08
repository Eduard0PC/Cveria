import { NextResponse } from 'next/server'
import pdfParse from 'pdf-parse'
import { analizarConOpenRouter } from '@/lib/ia'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('cv') as File
  const context = formData.get('context')?.toString() || ''

  if (!file) {
    return NextResponse.json({ error: 'Archivo no enviado' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const pdfText = (await pdfParse(buffer)).text

  //console.log('Texto extraído del PDF:', pdfText)

  const prompt = `
Tengo el siguiente CV:

${pdfText}

${context ? `El usuario indicó este contexto para el empleo deseado:\n${context}` : 'No especificado'}

Por favor, analiza el siguiente CV de forma crítica y profesional.

1. Indica qué frases, secciones o elementos pueden mejorarse para que el CV sea más claro, profesional y atractivo para reclutadores.

2. Proporciona ejemplos específicos de frases que deberían cambiarse y sugiéreme cómo reescribirlas de manera más efectiva.

3. Menciona si falta alguna sección importante según el tipo de puesto al que se dirige el CV.

4. Evalúa el CV con base en los siguientes criterios (de 0 a 10 cada uno):

 - Claridad y redacción

 - Relevancia de la información

 - Adecuación al puesto objetivo 

 - Impacto general

Calcula un porcentaje de aprobación general del 0 al 100 (da numeros enteros), claramente indicado como:

"Porcentaje de aprobación: XX%".
`
/*Por favor, analiza el CV y y dime qué frases o secciones puedo mejorar para hacerlo más profesional, 
claro y atractivo para reclutadores. 
Señala ejemplos específicos de frases que debería cambiar, y sugiéreme cómo reescribirlas. 
También dime si falta algo importante según el tipo de puesto al que se dirige.
Además, dame un porcentaje general de aprobación del CV del 0 al 100. Este porcentaje debe estar claramente indicado como: 
"Porcentaje de aprobación: XX%".
`*/ 
  const result = await analizarConOpenRouter(prompt)
  return NextResponse.json({ result })
}