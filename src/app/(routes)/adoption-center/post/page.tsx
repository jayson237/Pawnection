import getCurrentUser from "@/actions/getCurrentUser"
import AdoptionPost from "@/components/adoption/AdoptionPost"
import { UserType } from "@prisma/client"
import { redirect } from "next/navigation"

export default async function adoptionCenterPost() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (currUser.type !== UserType.PetAdoptionCentre) redirect("/adopt")
  return <AdoptionPost />
}
