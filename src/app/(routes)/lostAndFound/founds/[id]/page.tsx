import FoundPetReportPage from "@/components/lostAndFound/FoundPetReportPage"
import { getSpecificFoundPetReport } from "@/lib/actions/lostAndFound"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function foundPetReportPage({
  params,
}: {
  params: { id: string }
}) {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  const foundPetReport = await getSpecificFoundPetReport(params.id)

  return (
    <FoundPetReportPage foundPetReport={foundPetReport} currUser={currUser} />
  )
}
