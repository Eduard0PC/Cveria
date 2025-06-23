import type { Metadata } from "next";
import "../../globals.css";
import Header from "@/app/components/Header";


export const metadata: Metadata = {
  title: "Home",
  description: "Homepage de Cveria",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
