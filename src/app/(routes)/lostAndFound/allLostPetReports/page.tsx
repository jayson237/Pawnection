import getAllFoundPetReports from "@/actions/getAllFoundPetReports"
import getAllLostPetReports from "@/actions/getAllLostPetReports"
import getCurrentUser from "@/actions/getCurrentUser"
import AllLostPetReports from "@/components/lostAndFound/AllLostPetReports"
import { redirect } from "next/navigation"

export default async function allLostPetReports() {
  const currUser = await getCurrentUser()
  const allLostPetReports = await getAllLostPetReports()

  if (!currUser) redirect("/auth")
  return (
    <AllLostPetReports
      allLostPetReports={allLostPetReports}
    />
  )
}
