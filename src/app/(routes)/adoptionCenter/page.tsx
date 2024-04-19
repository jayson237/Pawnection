import AdoptionCenter from "@/components/adoptionCenter/AdoptionCenter"
import { getCurrentUser } from "@/lib/actions/user"
import { UserType } from "@prisma/client"
import { redirect } from "next/navigation"
import React from "react"

export default async function AdoptionCenterPage() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (!currUser?.type) redirect("/auth/type")
  if (currUser.type !== UserType.PetAdoptionCentre) redirect("/adopt")
  return <AdoptionCenter currUser={currUser} />
}
