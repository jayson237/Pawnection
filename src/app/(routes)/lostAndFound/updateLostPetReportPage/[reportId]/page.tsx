import UpdateLostPetReportPage from "@/components/lostAndFound/UpdateLostPetReportPage"
import { getSpecificLostPetReport } from "@/lib/actions/lostAndFound"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function updateLostPetReportPage({
  params,
}: {
  params: { reportId: string }
}) {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (currUser && !currUser.username) redirect("/settings")
  const id = params.reportId
  const lostPetReport = await getSpecificLostPetReport(id)
  return <UpdateLostPetReportPage lostPetReport={lostPetReport} />
}
