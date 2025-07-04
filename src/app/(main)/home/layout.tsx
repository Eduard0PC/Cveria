import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page of the application",
};
export default function HomeLayout({
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
