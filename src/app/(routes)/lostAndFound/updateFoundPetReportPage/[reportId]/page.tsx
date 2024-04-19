import UpdateFoundPetReportPage from "@/components/lostAndFound/UpdateFoundPetReportPage"
import { getSpecificFoundPetReport } from "@/lib/actions/lostAndFound"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function updateFoundPetReportPage({
  params,
}: {
  params: { reportId: string }
}) {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (currUser && !currUser.username) redirect("/settings")
  const id = params.reportId
  const foundPetReport = await getSpecificFoundPetReport(id)
  return <UpdateFoundPetReportPage foundPetReport={foundPetReport} />
}
