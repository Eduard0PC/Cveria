'use client'
import { useText } from '../../../context/JobContext';

export default function Upload() {
  const { text } = useText();

  return (
    <main className="mt-32 p-8">
      <h1>Texto recibido:</h1>
      <p>{text}</p>
    </main>
  );
}
