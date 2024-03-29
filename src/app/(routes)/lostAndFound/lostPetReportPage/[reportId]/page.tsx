import getCurrentUser from "@/actions/getCurrentUser"
import getSpecificLostPetReport from "@/actions/getSpecificLostPetReport"
import LostPetReportPage from "@/components/lostAndFound/LostPetReportPage"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"

export default async function lostPetReportPage({
  params,
}: {
  params: { reportId: string }
}) {
  const currUser = await getCurrentUser()

  const id = params.reportId
  const lostPetReport = await getSpecificLostPetReport(id)
  if (!currUser) redirect("/auth")
  return <LostPetReportPage lostPetReport={lostPetReport} />
}
