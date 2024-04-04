import LostAndFound from "@/components/lostAndFound/LostAndFound"
import { getAllFoundPetReports } from "@/lib/actions/lostAndFound"
import { getAllLostPetReports } from "@/lib/actions/lostAndFound"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function lostAndFound() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  const allLostPetReports = await getAllLostPetReports()
  const allFoundPetReports = await getAllFoundPetReports()

  return (
    <LostAndFound
      allLostPetReports={allLostPetReports}
      allFoundPetReports={allFoundPetReports}
    />
  )
}
