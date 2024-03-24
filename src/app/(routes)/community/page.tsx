import getCurrentUser from "@/actions/getCurrentUser"
import PostForm from "@/components/community/posts/PostForm"
import PostList from "@/components/community/posts/PostList"
import { redirect } from "next/navigation"

export default async function Community() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  return (
    <div className="w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[60px]">
        <div className="mx-auto flex flex-col items-center">
          <PostForm />
          <PostList />
        </div>
      </div>
    </div>
  )
}
