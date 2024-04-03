import getAllFoundPetReports from "@/actions/getAllFoundPetReports"
import getAllLostPetReports from "@/actions/getAllLostPetReports"
import LostAndFound from "@/components/lostAndFound/LostAndFound"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/user"

export default async function lostAndFound() {
  const currUser = await getCurrentUser()
  const allLostPetReports = await getAllLostPetReports()
  const allFoundPetReports = await getAllFoundPetReports()

  if (!currUser) redirect("/auth")
  return (
    <LostAndFound
      allLostPetReports={allLostPetReports}
      allFoundPetReports={allFoundPetReports}
    />
  )
}
