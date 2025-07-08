// components/CVViewer.tsx
'use client'
import React from 'react'

type AnswersType = {
  nombre: string
  contacto: { tipo: string; valor: string }[]
  perfil: string
  experiencia: { puesto: string; empresa: string; descripcion: string }[]
  educacion: { titulo: string; institucion: string }[]
  habilidades: string[]
  fortalezas: string[]
}

export default function CVone({ cv }: { cv: AnswersType }) {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-10 space-y-6">
        <h1 className="text-3xl font-bold text-center">{cv.nombre}</h1>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contacto</h2>
          <ul className="list-disc pl-5">
            {cv.contacto.map((c, i) => (
              <li key={i}><strong>{c.tipo}:</strong> {c.valor}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Perfil Profesional</h2>
          <p className="text-gray-700">{cv.perfil}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Experiencia Laboral</h2>
          {cv.experiencia.length === 0 ? (
            <p>Sin experiencia laboral.</p>
          ) : (
            <ul className="space-y-3">
              {cv.experiencia.map((exp, i) => (
                <li key={i}>
                  <p className="font-semibold">{exp.puesto} en {exp.empresa}</p>
                  <p className="text-gray-700">{exp.descripcion}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Educación</h2>
          {cv.educacion.length === 0 ? (
            <p>No especificada.</p>
          ) : (
            <ul className="list-disc pl-5">
              {cv.educacion.map((edu, i) => (
                <li key={i}>{edu.titulo} en {edu.institucion}</li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {cv.habilidades.map((h, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{h}</span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Fortalezas y Logros</h2>
          <ul className="list-disc pl-5">
            {cv.fortalezas.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
