import LostPetReportPage from "@/components/lostAndFound/LostPetReportPage"
import { getSpecificLostPetReport } from "@/lib/actions/lostAndFound"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function lostPetReportPage({
  params,
}: {
  params: { id: string }
}) {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  const lostPetReport = await getSpecificLostPetReport(params.id)

  return <LostPetReportPage lostPetReport={lostPetReport} currUser={currUser} />
}
