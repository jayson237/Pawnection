import UpdateFoundPetReportPage from "@/components/lostAndFound/UpdateFoundPetReportPage"
import { getSpecificFoundPetReport } from "@/lib/actions/lostAndFound"


export default async function updateFoundPetReportPage({
  params,
}: {
  params: { reportId: string }
}) {
  const id = params.reportId
  const foundPetReport = await getSpecificFoundPetReport(id)
  return <UpdateFoundPetReportPage foundPetReport={foundPetReport} />
}
