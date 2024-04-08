import AllLostPetReports from "@/components/lostAndFound/AllLostPetReports"
import { getAllLostPetReports } from "@/lib/actions/lostAndFound"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function allLostPetReports() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  const allLostPetReports = await getAllLostPetReports()

  return <AllLostPetReports allLostPetReports={allLostPetReports} />
}
