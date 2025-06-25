import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cveria",
  description: "Curriculums + IA = Cveria",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
