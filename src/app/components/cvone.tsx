'use client'
import React from 'react'
import { FaEnvelope, FaPhone, FaLinkedin, FaUserTie, FaBriefcase, FaGraduationCap, FaStar } from 'react-icons/fa'

type AnswersType = {
  nombre: string
  contacto: { tipo: string; valor: string }[]
  perfil: string
  experiencia: { puesto: string; empresa: string; descripcion: string }[]
  educacion: { titulo: string; institucion: string }[]
  habilidades: string[]
  fortalezas: string[]
}

const iconMap: Record<string, React.ReactNode> = {
  Email: <FaEnvelope className="inline mr-2 text-blue-700" />,
  Teléfono: <FaPhone className="inline mr-2 text-blue-700" />,
  LinkedIn: <FaLinkedin className="inline mr-2 text-blue-700" />,
}

export default function CVone({ cv }: { cv: AnswersType }) {
  return (
    <div className="min-h-screen  py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-blue-900 text-white px-8 py-8">
          <div className="flex-shrink-0 w-28 h-28 rounded-full bg-blue-700 flex items-center justify-center text-5xl font-bold shadow-lg">
            {cv.nombre.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">{cv.nombre}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              {cv.contacto.map((c, i) => (
                <span key={i} className="flex items-center gap-1 text-sm bg-blue-800/80 px-3 py-1 rounded-full shadow">
                  {iconMap[c.tipo] || <FaUserTie className="inline mr-2 text-blue-700" />}
                  <span className="font-medium">{c.valor}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Perfil Profesional */}
        <section className="px-8 py-6 border-b border-gray-200">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-800 mb-2">
            <FaUserTie /> Perfil Profesional
          </h2>
          <p className="text-gray-700 leading-relaxed">{cv.perfil}</p>
        </section>

        {/* Experiencia Laboral */}
        <section className="px-8 py-6 border-b border-gray-200">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-800 mb-4">
            <FaBriefcase /> Experiencia Laboral
          </h2>
          {cv.experiencia.length === 0 ? (
            <p className="text-gray-600 italic">Sin experiencia laboral.</p>
          ) : (
            <ul className="space-y-6">
              {cv.experiencia.map((exp, i) => (
                <li key={i} className="bg-blue-50 rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
                  <p className="font-semibold text-gray-900 text-lg">{exp.puesto} <span className="text-blue-700">en {exp.empresa}</span></p>
                  <p className="text-gray-700 mt-1">{exp.descripcion}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Educación */}
        <section className="px-8 py-6 border-b border-gray-200">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-800 mb-4">
            <FaGraduationCap /> Educación
          </h2>
          {cv.educacion.length === 0 ? (
            <p className="text-gray-600 italic">No especificada.</p>
          ) : (
            <ul className="space-y-3">
              {cv.educacion.map((edu, i) => (
                <li key={i} className="bg-white rounded-lg shadow px-4 py-2 border border-blue-100">
                  <span className="font-medium text-gray-800">{edu.titulo}</span>
                  <span className="text-gray-600"> – {edu.institucion}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Habilidades */}
        <section className="px-8 py-6 border-b border-gray-200">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-800 mb-4">
            <FaStar /> Habilidades
          </h2>
          <div className="flex flex-wrap gap-3">
            {cv.habilidades.map((h, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 font-medium px-4 py-1 rounded-full text-sm shadow-sm border border-blue-200"
              >
                {h}
              </span>
            ))}
          </div>
        </section>

        {/* Fortalezas y Logros */}
        <section className="px-8 py-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-800 mb-4">
            <FaStar /> Fortalezas y Logros
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            {cv.fortalezas.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}