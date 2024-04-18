import AdoptPost from "@/components/adopt/AdoptPost"
import { getAllAdoptablePets } from "@/lib/actions/adopt"
import { notFound } from "next/navigation"
import React from "react"

export default async function AdoptViewAllPetsPage() {
  const adoptablePets = await getAllAdoptablePets()

  if (!adoptablePets) {
    return notFound()
  }

  return <AdoptPost adoptablePets={adoptablePets} />
}
