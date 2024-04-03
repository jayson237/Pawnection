import { getCurrentUser } from "@/lib/actions/user"
import getSpecificLostPetReport from "@/actions/getSpecificLostPetReport"
import FoundPetReportPage from "@/components/lostAndFound/FoundPetReportPage"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"
import UpdateLostPetReportPage from "@/components/lostAndFound/UpdateLostPetReportPage"

export default async function updateLostPetReportPage({
  params,
}: {
  params: { reportId: string }
}) {
//   const currUser = await getCurrentUser()

  const id = params.reportId
  const lostPetReport = await getSpecificLostPetReport(id)
  return <UpdateLostPetReportPage lostPetReport={lostPetReport} />
}
