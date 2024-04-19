import AllFoundPetReports from "@/components/lostAndFound/AllFoundPetReports"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function allFoundetReports() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")

  return <AllFoundPetReports />
}
