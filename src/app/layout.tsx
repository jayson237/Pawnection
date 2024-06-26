import NavBar from "@/components/NavBar"
import Footer from "@/components/ui/Footer"
import { Toaster } from "@/components/ui/Toaster"
import AuthContext from "@/context/AuthContext"
import { getCurrentUser } from "@/lib/actions/user"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pawnection",
  description: "Your paw's social media network",
  icons: {
    icon: "/icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={`${inter.className} w-screen overflow-x-hidden`}>
        <AuthContext>
          <main className="min-h-[calc(100vh-78px)] w-full">
            <NavBar currentUser={currentUser} />
            {children}
          </main>
          <Footer />
        </AuthContext>
        <Toaster />
      </body>
    </html>
  )
}
