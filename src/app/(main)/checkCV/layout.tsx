import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Analizar CV',
  description: 'analizar CV con IA',
};
export default function CheckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
