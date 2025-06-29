import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Antes de comenzar...',
  description: 'Describe el puesto al que deseas aplicar.',
};
export default function JobLayout({
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
