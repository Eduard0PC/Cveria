'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiFillFilePdf, AiOutlineClose } from 'react-icons/ai';

export default function checkPage() {
  const router = useRouter();
  const [context, setContext] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleUpload = async () => {
    console.log('Texto guardado:', context);
    if (!file) return alert('Por favor, sube un archivo PDF.');

    const formData = new FormData();
    formData.append('cv', file);
    formData.append('context', context);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.text();
    console.log('Respuesta IA:', data);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      alert('Solo se permiten archivos PDF.');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  if (dragging) {
    return (
      <main
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={() => setDragging(false)}
        className="flex items-center justify-center min-h-screen bg-blue-50 transition-all duration-300"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
          Suelta el archivo aquí para subir tu CV
        </h2>
      </main>
    );
  }

  return (
    <main
      className="flex flex-col items-center min-h-screen px-4"
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
    >
      <h1 className="text-4xl sm:text-5xl text-center font-bold mt-27">
        <strong>Sube tu CV en PDF</strong>
      </h1>

      <div className="relative mt-8 flex flex-col items-center">
        {!file ? (
          <>
            <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white text-3xl font-semibold px-100 py-10 rounded-xl shadow-md">
              Elegir archivo
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2 text-center">
              O arrastra el archivo PDF aquí para subirlo.
            </p>
          </>
        ) : file.type !== 'application/pdf' ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow text-center">
            <p>Solo se permiten archivos PDF. Por favor, selecciona un archivo válido.</p>
            <button
              onClick={() => setFile(null)}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Eliminar archivo
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow border border-gray-300">
            <AiFillFilePdf className="text-red-600 text-2xl" />
            <span className="text-gray-800 font-medium truncate max-w-[200px]">{file.name}</span>
            <button
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 transition"
              title="Eliminar archivo"
            >
              <AiOutlineClose className="text-xl" />
            </button>
          </div>
        )}
      </div>

      <label className="block w-full max-w-6xl mt-6">
        <p className="text-lg">
          Describe brevemente para qué puesto estás aplicando, para dar resultados más precisos (opcional).
        </p>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Escribe aquí el puesto o descríbelo..."
          className="w-full h-40 mt-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </label>

      <button
        className="cursor-pointer mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-green-700"
        onClick={handleUpload}
      >
        Analizar CV
      </button>
    </main>
  );
}
