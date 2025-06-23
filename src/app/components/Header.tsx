import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ClientHeader from "./ClientHeader";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let username = null;

  if (token && JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      username = decoded.name;
    } catch (err) {
      console.error("Token inválido:", err);
    }
  }

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Cveria</h1>
      <div className="flex items-center gap-4">
        {username && (
          <>
            <span className="text-sm">Bienvenido, {username}</span>
            <ClientHeader />
          </>
        )}
      </div>
    </header>
  );
}
