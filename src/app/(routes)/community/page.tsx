import getCurrentUser from "@/actions/getCurrentUser"
import PostList from "@/components/community/posts/PostList"
import { redirect } from "next/navigation"

export default async function Community() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  return (
    <div className="w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <PostList />
    </div>
  )
}
