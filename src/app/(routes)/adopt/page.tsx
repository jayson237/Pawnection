import AdoptPost from "@/components/adopt/AdoptPost"
import { getCurrentUser } from "@/lib/actions/user"
import { UserType } from "@prisma/client"
import { redirect } from "next/navigation"
import React from "react"

export default async function AdoptViewAllPetsPage() {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect("/auth")
  if (currentUser && !currentUser.username) redirect("/settings")
  if (currentUser.type !== UserType.PetLover) redirect("/adoptionCenter")
  return <AdoptPost />
}
