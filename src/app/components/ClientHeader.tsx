// app/components/ClientHeader.tsx
'use client'
import { useRouter } from "next/navigation";

export default function ClientHeader() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
    >
      Cerrar sesión
    </button>
  );
}
