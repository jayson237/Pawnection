import PostList from "@/components/explore/PostList"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function Community() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")

  return (
    <div className="w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[40px] px-16">
        <PostList />
      </div>
    </div>
  )
}
