import { getAllAdoptablePets } from "@/lib/actions/adopt"
import { notFound } from "next/navigation"
import React from "react"
import AdoptPage from "@/components/adopt/AdoptPage"

export default async function AdoptViewAllPetsPage() {
  const adoptablePets = await getAllAdoptablePets()

  if (!adoptablePets) {
    return notFound()
  }

  return (
    <AdoptPage adoptablePets={adoptablePets} />
  )
}
