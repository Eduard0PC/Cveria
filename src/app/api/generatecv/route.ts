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
    const { answers, context, correcciones } = body as { answers: AnswersType; context: string; correcciones?: string }

    const prompt = generarPrompt(answers, context, correcciones)
    const response = await analizarConOpenRouter(prompt)

    const cvMejorado = JSON.parse(response);

    return NextResponse.json({ cv: cvMejorado })

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Error desconocido' }, { status: 500 })
  }
}

function generarPrompt(answers: AnswersType, context: string, correcciones?: string): string {
  return `
Eres un experto en redacción y optimización de currículums para maximizar la puntuación en análisis profesional de CV.

${correcciones && correcciones.trim() ? `El usuario solicita estas correcciones específicas:\n${correcciones}\n` : ''}

Tu objetivo es crear un CV que obtenga la máxima calificación (100%) en los siguientes criterios:

1. Claridad y redacción impecable.
2. Relevancia total de la información para el puesto objetivo.
3. Adecuación perfecta al contexto y tipo de empleo deseado.
4. Impacto general sobresaliente.

Transforma la información siguiente en un CV profesional, claro, atractivo y orientado a resultados, usando logros cuantificables, verbos de acción y lenguaje específico del sector. Completa cualquier sección faltante de forma creíble y relevante para el puesto.

Devuelve el CV final como un **objeto JSON** con la estructura EXACTA:

{
  "nombre": "...",
  "contacto": [ { "tipo": "...", "valor": "..." }, ... ],
  "perfil": "...",
  "experiencia": [ { "puesto": "...", "empresa": "...", "descripcion": "..." }, ... ],
  "educacion": [ { "titulo": "...", "institucion": "..." }, ... ],
  "habilidades": ["...", "..."],
  "fortalezas": ["...", "..."]
}

### Indicaciones:

- Convierte descripciones genéricas en logros cuantificables y medibles.
- Usa verbos de acción y lenguaje profesional.
- Completa información crítica faltante (logros, tecnologías, certificaciones, etc.).
- Adapta el contenido al puesto objetivo: "${context || 'No especificado'}".
- Reescribe fortalezas y logros de forma extensa y profesional.
- No uses frases vagas como "soy responsable", "me gusta trabajar en equipo", etc.
- **No agregues explicaciones ni comentarios. Solo el JSON.**

Información original:

Nombre: ${answers.nombre}
Contacto: ${answers.contacto.map(c => `${c.tipo}: ${c.valor}`).join(', ')}

Perfil:
${answers.perfil}

Experiencia:
${answers.experiencia.length ? answers.experiencia.map(e => `${e.puesto} en ${e.empresa}: ${e.descripcion}`).join('\n') : 'Sin experiencia'}

Educación:
${answers.educacion.length ? answers.educacion.map(e => `${e.titulo} en ${e.institucion}`).join('\n') : 'No especificada'}

Habilidades:
${answers.habilidades.join(', ') || 'No indicadas'}

Fortalezas o logros:
${answers.fortalezas.join(', ') || 'No indicadas'}
`
}
