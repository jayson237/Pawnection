import LostAndFound from "@/components/lostAndFound/LostAndFound"
import getCurrentUser from "@/actions/getCurrentUser"
import PostForm from "@/components/community/posts/PostForm"
import PostList from "@/components/community/posts/PostList"
import { redirect } from "next/navigation"
import getAllLostPetReports from "@/actions/getAllLostPetReports"
import getAllFoundPetReports from "@/actions/getAllFoundPetReports"

export default async function lostAndFound() {
    const currUser = await getCurrentUser()
    const allLostPetReports = await getAllLostPetReports()
    const allFoundPetReports = await getAllFoundPetReports()
    console.log(allFoundPetReports)
    if (!currUser) redirect("/auth")    
    return (
        <LostAndFound allLostPetReports={allLostPetReports} allFoundPetReports = {allFoundPetReports} />

    )
}
  