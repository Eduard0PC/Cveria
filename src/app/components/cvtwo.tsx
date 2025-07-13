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
  Email: <FaEnvelope className="inline mr-2 text-green-700" />,
  Teléfono: <FaPhone className="inline mr-2 text-green-700" />,
  LinkedIn: <FaLinkedin className="inline mr-2 text-green-700" />,
}

export default function CVtwo({ cv }: { cv: AnswersType }) {
  return (
    <div className="min-h-screen py-12 px-2">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 rounded-2xl shadow-2xl overflow-hidden border border-green-200">
        {/* Sidebar */}
        <aside className="bg-green-800 text-white p-8 flex flex-col items-center md:items-start gap-8 md:gap-12 md:min-h-full">
          <div className="w-32 h-32 rounded-full bg-green-600 flex items-center justify-center text-6xl font-extrabold shadow-lg mb-4">
            {cv.nombre.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2 text-center md:text-left">{cv.nombre}</h1>
            <ul className="space-y-3 mt-4">
              {cv.contacto.map((c, i) => (
                <li key={i} className="flex items-center gap-2 text-base">
                  {iconMap[c.tipo] || <FaUserTie className="inline mr-2 text-green-300" />}
                  <span className="font-medium">{c.valor}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block mt-auto">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><FaStar /> Habilidades</h2>
            <div className="flex flex-wrap gap-2">
              {cv.habilidades.map((h, i) => (
                <span
                  key={i}
                  className="bg-green-600/80 text-white px-3 py-1 rounded-full text-xs font-medium shadow"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-2 bg-white p-8 md:p-12 flex flex-col gap-10">
          {/* Perfil Profesional */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-green-800 mb-3">
              <FaUserTie /> Perfil Profesional
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-green-400 pl-4 italic">{cv.perfil}</p>
          </section>

          {/* Experiencia Laboral */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-green-800 mb-3">
              <FaBriefcase /> Experiencia Laboral
            </h2>
            {cv.experiencia.length === 0 ? (
              <p className="text-gray-500 italic">Sin experiencia laboral.</p>
            ) : (
              <div className="flex flex-col gap-6">
                {cv.experiencia.map((exp, i) => (
                  <div key={i} className="border-l-4 border-green-500 pl-6 py-2 bg-green-50 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <span className="font-semibold text-lg text-green-900">{exp.puesto}</span>
                      <span className="text-green-700 font-medium">en {exp.empresa}</span>
                    </div>
                    <p className="text-gray-700 mt-1">{exp.descripcion}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Educación */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-green-800 mb-3">
              <FaGraduationCap /> Educación
            </h2>
            {cv.educacion.length === 0 ? (
              <p className="text-gray-500 italic">No especificada.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {cv.educacion.map((edu, i) => (
                  <li key={i} className="bg-white border-l-4 border-green-400 pl-4 py-2 rounded shadow-sm">
                    <span className="font-semibold text-green-900">{edu.titulo}</span>
                    <span className="text-gray-600"> – {edu.institucion}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Fortalezas y Logros */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-green-800 mb-3">
              <FaStar /> Fortalezas y Logros
            </h2>
            <ul className="list-disc pl-8 text-gray-700 space-y-2">
              {cv.fortalezas.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </section>
        </main>

        {/* Habilidades (Mobile Only) */}
        <div className="md:hidden bg-green-100 p-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-green-800"><FaStar /> Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {cv.habilidades.map((h, i) => (
              <span
                key={i}
                className="bg-green-600/80 text-white px-3 py-1 rounded-full text-xs font-medium shadow"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}