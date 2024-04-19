import BackButton from "@/components/BackButton"
import HeaderTitle from "@/components/HeaderTitle"
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
    <div className="w-full max-w-[1240px] mx-auto px-4">
      <div className="py-[60px] w-full">
        <div className="flex">
          <BackButton />

          <div className="mx-auto flex flex-col items-center">
            <HeaderTitle className="max-w-full max-md:text-3xl">
              Found Pet Report
            </HeaderTitle>
          </div>
        </div>
      </div>
      <FoundPetReportPage foundPetReport={foundPetReport} currUser={currUser} />
    </div>
  )
}
