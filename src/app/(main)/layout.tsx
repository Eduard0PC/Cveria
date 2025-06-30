import Header from "@/app/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV"
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
