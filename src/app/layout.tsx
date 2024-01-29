import { Toaster } from "@/components/ui/Toaster"
import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pawnection",
  description: "Your paw's social media network",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={`${inter.className} min-h-screen w-screen overflow-x-hidden`}
        >
          <main className="h-[1px] min-h-[calc(100vh-88px)] w-full ">
            {children}
          </main>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}
