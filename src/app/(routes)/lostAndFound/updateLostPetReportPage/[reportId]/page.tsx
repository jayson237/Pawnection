import { getSpecificLostPetReport } from "@/lib/actions/lostAndFound"
import UpdateLostPetReportPage from "@/components/lostAndFound/UpdateLostPetReportPage"

export default async function updateLostPetReportPage({
  params,
}: {
  params: { reportId: string }
}) {
  const id = params.reportId
  const lostPetReport = await getSpecificLostPetReport(id)
  return <UpdateLostPetReportPage lostPetReport={lostPetReport} />
}
