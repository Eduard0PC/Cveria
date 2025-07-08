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
    <div className="min-h-screen mt-16 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-10 space-y-10 border border-gray-200">
        {/* Nombre */}
        <div className="text-center border-b border-gray-300 pb-6">
          <h1 className="text-4xl font-bold text-blue-900">{cv.nombre}</h1>
        </div>

        {/* Contacto */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Contacto</h2>
          <ul className="space-y-1 text-gray-700">
            {cv.contacto.map((c, i) => (
              <li key={i}>
                <span className="font-medium text-gray-800">{c.tipo}:</span> {c.valor}
              </li>
            ))}
          </ul>
        </section>

        {/* Perfil Profesional */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Perfil Profesional</h2>
          <p className="text-gray-700 leading-relaxed">{cv.perfil}</p>
        </section>

        {/* Experiencia Laboral */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Experiencia Laboral</h2>
          {cv.experiencia.length === 0 ? (
            <p className="text-gray-600 italic">Sin experiencia laboral.</p>
          ) : (
            <ul className="space-y-4">
              {cv.experiencia.map((exp, i) => (
                <li key={i} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-900">{exp.puesto} <span className="text-blue-700">en {exp.empresa}</span></p>
                  <p className="text-gray-700">{exp.descripcion}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Educación */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Educación</h2>
          {cv.educacion.length === 0 ? (
            <p className="text-gray-600 italic">No especificada.</p>
          ) : (
            <ul className="space-y-2">
              {cv.educacion.map((edu, i) => (
                <li key={i}>
                  <span className="font-medium text-gray-800">{edu.titulo}</span> <span className="text-gray-600">– {edu.institucion}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Habilidades */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Habilidades</h2>
          <div className="flex flex-wrap gap-3">
            {cv.habilidades.map((h, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 font-medium px-4 py-1 rounded-full text-sm shadow-sm"
              >
                {h}
              </span>
            ))}
          </div>
        </section>

        {/* Fortalezas */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Fortalezas y Logros</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {cv.fortalezas.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
