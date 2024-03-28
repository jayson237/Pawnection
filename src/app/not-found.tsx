"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import React from "react"

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-center font-medium text-xl">404 - Page Not Found</h1>
      <Button className="mt-4">
        <Link href="/">Go to home</Link>
      </Button>
    </div>
  )
}

export default NotFound
