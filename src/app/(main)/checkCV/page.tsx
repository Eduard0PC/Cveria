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

    const response = await fetch('/api/checkcv', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      alert('Hubo un error al analizar el CV.')
      return
    }

    const data = await response.json()

    sessionStorage.setItem('resultadoIA', data.result)
    router.push('/results');

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
        className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 transition-all duration-300 px-4 text-center"
      >
        <div className="flex flex-wrap justify-center items-center gap-3 text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-200">
          <AiFillFilePdf className="text-red-600 text-4xl" />
          <span>Suelta el archivo aquí para subir tu CV</span>
        </div>
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
      <h1 className="text-3xl sm:text-5xl text-center font-bold mt-20 px-2">
        <strong>Sube tu CV en PDF</strong>
      </h1>

      <div className="relative mt-8 flex flex-col items-center w-full max-w-md sm:max-w-none">
        {!file ? (
          <>
            <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white text-2xl sm:text-3xl font-semibold px-6 py-6 sm:px-28 sm:py-10 rounded-xl shadow-md text-center w-full max-w-md">
              Elegir archivo
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2 text-center px-2">
              O arrastra el archivo PDF aquí para subirlo.
            </p>
          </>
        ) : file.type !== 'application/pdf' ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow text-center w-full max-w-sm">
            <p>Solo se permiten archivos PDF. Por favor, selecciona un archivo válido.</p>
            <button
              onClick={() => setFile(null)}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
            >
              Eliminar archivo
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow border border-gray-300 dark:border-gray-600 max-w-full">
            <AiFillFilePdf className="text-red-600 text-2xl" />
            <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[200px]">
              {file.name}
            </span>
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

      <label className="block w-full max-w-6xl mt-6 px-2">
        <p className="text-lg text-center sm:text-left">
          <strong>(Opcional)</strong> Describe brevemente para qué puesto estás aplicando, para dar resultados más precisos.
        </p>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Escribe aquí el puesto o descríbelo..."
          className="resize-none w-full h-40 mt-4 p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </label>

      <button
        className="cursor-pointer mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded hover:bg-radial w-full max-w-xs sm:max-w-fit"
        onClick={handleUpload}
      >
        Analizar CV
      </button>
    </main>
  );
}
