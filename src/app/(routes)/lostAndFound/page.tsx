import getAllFoundPetReports from "@/actions/getAllFoundPetReports"
import getAllLostPetReports from "@/actions/getAllLostPetReports"
import getCurrentUser from "@/actions/getCurrentUser"
import PostForm from "@/components/community/posts/PostForm"
import PostList from "@/components/community/posts/PostList"
import LostAndFound from "@/components/lostAndFound/LostAndFound"
import { redirect } from "next/navigation"

export default async function lostAndFound() {
  const currUser = await getCurrentUser()
  const allLostPetReports = await getAllLostPetReports()
  const allFoundPetReports = await getAllFoundPetReports()

  if (!currUser) redirect("/auth")
  return (
    <LostAndFound
      allLostPetReports={allLostPetReports}
      allFoundPetReports={allFoundPetReports}
    />
  )
}
