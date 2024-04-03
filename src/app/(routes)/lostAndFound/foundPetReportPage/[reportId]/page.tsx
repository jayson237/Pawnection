import { getCurrentUser } from "@/lib/actions/user"
import getSpecificFoundPetReport from "@/actions/getSpecificFoundPetReport"
import FoundPetReportPage from "@/components/lostAndFound/FoundPetReportPage"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"

export default async function foundPetReportPage({
  params,
}: {
  params: { reportId: string }
}) {
  const currUser = await getCurrentUser()

  const id = params.reportId
  const foundPetReport = await getSpecificFoundPetReport(id)
  if (!currUser) redirect("/auth")
  return <FoundPetReportPage foundPetReport={foundPetReport} currUser = {currUser}/>
}
