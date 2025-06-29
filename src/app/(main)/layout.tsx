import Header from "@/app/components/Header";
import type { Metadata } from "next";
import { TextProvider } from '../../context/JobContext';

export const metadata: Metadata = {
  title: "App"
};
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <TextProvider>
        {children}
      </TextProvider>
    </>
  );
}
