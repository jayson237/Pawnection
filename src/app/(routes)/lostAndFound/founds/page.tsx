import AllFoundPetReports from "@/components/lostAndFound/AllFoundPetReports"
import { getAllFoundPetReports } from "@/lib/actions/lostAndFound"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function allFoundetReports() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  const allFoundPetReports = await getAllFoundPetReports()

  return <AllFoundPetReports allFoundPetReports={allFoundPetReports} />
}
