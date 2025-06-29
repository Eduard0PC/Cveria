'use client'
import { useRouter } from 'next/navigation';
import { DocumentIcon, AnalizeDocIcon } from '../../components/icons';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 ">
      <h1 className="text-4xl sm:text-5xl text-center font-bold mb-12">
        ¿Qué deseas hacer?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-5xl">
        <button
          onClick={() => router.push('')}
          className="group rounded-3xl border p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] text-left"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <DocumentIcon />
            <h2 className="text-2xl font-bold group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 group-hover:text-transparent group-hover:bg-clip-text">
              <strong>Crea tu CV</strong>
            </h2>
            <p className="text-sm sm:text-base max-w-sm">
              Crea un CV totalmente personalizado con inteligencia artificial.
            </p>
          </div>
        </button>

        <button
          onClick={() => router.push('/job')}
          className="group rounded-3xl border p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] text-left"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <AnalizeDocIcon />
            <h2 className="text-2xl font-bold group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 group-hover:text-transparent group-hover:bg-clip-text">
              <strong>Analiza tu CV</strong>
            </h2>
            <p className="text-sm sm:text-base max-w-sm">
              ¿Ya tienes un CV? Analízalo y recibe sugerencias con IA.
            </p>
          </div>
        </button>
      </div>
    </main>
  );
}
