'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function checkPage() {
  const router = useRouter();
  const [text, setText] = useState('');

  const handleClick = () => {
    console.log('Texto guardado:', text);
    //router.push('/upload')
  };

  return (
    <main className="flex flex-col items-center min-h-screen px-4 ">
      <h1 className="text-4xl sm:text-5xl text-center font-bold mt-27">
        Analizemos el CV
      </h1>
      <p className="mt-4 text-lg">
        Sube tu CV en PDF para proceder a analizarlo.
      </p>
      <p className="mt-4 text-lg">
        Describe brevemente para qué puesto estás aplicando, para dar resultados más precisos.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe aquí el puesto o descríbelo..."
        className="w-full max-w-6xl h-40 mt-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={handleClick}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Listo
      </button>
    </main>
  );
}
