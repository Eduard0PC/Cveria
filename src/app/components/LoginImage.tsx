'use client'
import Image from 'next/image'

export default function LoginImage() {
    return (
        <div className="mask-l-from-50% mask-l-to-100% hidden md:flex w-1/2 h-screen relative bg-blue-50 dark:bg-neutral-800">
            <Image
                src="/img/login.jpeg"
                alt="login"
                fill
                className="object-cover" // Usa "cover" para llenar bien el espacio
                priority
            />
        </div>
    )
}
