import { getCurrentUser } from "@/lib/actions/user"
// import getSpecificFoundPetReport from "@/actions/getSpecificFoundPetReport"
import { getSpecificFoundPetReport } from "@/lib/actions/lostAndFound"
import FoundPetReportPage from "@/components/lostAndFound/FoundPetReportPage"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"
import UpdateFoundPetReportPage from  "@/components/lostAndFound/UpdateFoundPetReportPage"


export default async function updateFoundPetReportPage({
  params,
}: {
  params: { reportId: string }
}) {
//   const currUser = await getCurrentUser()

  const id = params.reportId
  const foundPetReport = await getSpecificFoundPetReport(id)
  return <UpdateFoundPetReportPage foundPetReport={foundPetReport} />
}
