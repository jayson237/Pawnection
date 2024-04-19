import AllLostPetReports from "@/components/lostAndFound/AllLostPetReports"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function allLostPetReports() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (currUser && !currUser.username) redirect("/settings")

  return <AllLostPetReports />
}
