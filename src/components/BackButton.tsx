"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "./ui/Button"

const BackButton = () => {
  const router = useRouter()
  return (
    <Button
      className="border-none"
      variant="outline"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-6 h-6" />
    </Button>
  )
}

export default BackButton
