import getAllFoundPetReports from "@/actions/getAllFoundPetReports"
import getCurrentUser from "@/actions/getCurrentUser"
import { redirect } from "next/navigation"
import AllFoundPetReports from "@/components/lostAndFound/AllFoundPetReports"

export default async function allFoundetReports() {
  const currUser = await getCurrentUser()
  const allFoundPetReports = await getAllFoundPetReports()

  if (!currUser) redirect("/auth")
  return (
    <AllFoundPetReports
      allFoundPetReports={allFoundPetReports}
    />
  )
}
