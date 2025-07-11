import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ClientHeader from "./ClientHeader";
import Link from "next/link";

const JWT_SECRET = process.env.JWT_SECRET as string;
interface JwtPayload {
  name: string;
}

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let username = null;

  if (token && JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      username = decoded.name;
    } catch (err) {
      console.error("Token inválido:", err);
    }
  }

  return (
    <header className="print:hidden fixed top-0 w-full z-50 bg-white dark:bg-neutral-900 p-4 flex justify-between items-center shadow-sm dark:shadow-md transition-colors duration-300">
      <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 hover:bg-radial">
        <Link href="/home">
          Cveria
        </Link>
      </h1>
      <div className="flex items-center gap-4">
        {username && (
          <>
            <span className="text-sm text-black dark:text-white">Bienvenid@ {username}</span>
            <ClientHeader />
          </>
        )}
      </div>
    </header>
  );
}
