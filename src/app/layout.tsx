import NavBar from "@/components/NavBar"
import { Toaster } from "@/components/ui/Toaster"
import AuthContext from "@/context/AuthContext"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import Footer from "../components/shared/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pawnection",
  description: "Your paw's social media network",
  icons: {
    icon: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen w-screen overflow-x-hidden`}
      >
        <AuthContext>
          <NavBar />
          <main className="h-[1px] min-h-[calc(100vh-78px)] w-full ">
            {children}
            <Footer />
          </main>
        </AuthContext>
        <Toaster />
      </body>
    </html>
  )
}
