import Feed from "@/components/explore/Feed"
import { getAllPosts } from "@/lib/actions/post"
import { getCurrentUser } from "@/lib/actions/user"
import { getAllUsers } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function Community() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")

  const posts = await getAllPosts()
  const users = await getAllUsers()

  return (
    <div className="flex justify-center w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[40px]">
        <Feed
          fetchedPosts={posts}
          fetchedUsers={users}
          currentUser={currUser}
        />
      </div>
    </div>
  )
}
