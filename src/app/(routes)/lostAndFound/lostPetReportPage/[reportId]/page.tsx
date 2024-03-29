import LostPetReportPage from "@/components/lostAndFound/LostPetReportPage"
import { redirect } from "next/navigation"
import getCurrentUser from "@/actions/getCurrentUser"
import { useRouter } from "next/router"
import getSpecificLostPetReport from "@/actions/getSpecificLostPetReport"

export default async function lostPetReportPage({
    params,
  }: {
    params: { reportId: string }
  }) {
    const currUser = await getCurrentUser()

    const id = params.reportId
    console.log("test")
    console.log(id)
    const lostPetReport = await getSpecificLostPetReport(id)
    console.log(lostPetReport)
    if (!currUser) redirect("/auth")    
    return (
        <LostPetReportPage lostPetReport = {lostPetReport} />
    )
}
  
