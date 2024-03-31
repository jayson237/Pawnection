import FilterSearch from "@/components/explore/FilterSearch"
import Post from "@/components/explore/PostContent"
import { getAllPosts } from "@/lib/actions/post"
import { getCurrentUser } from "@/lib/actions/user"
import { notFound, redirect } from "next/navigation"

export default async function Community() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")

  const posts = await getAllPosts()
  if (!posts) {
    return notFound()
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[40px] px-16">
        <div className="flex flex-col items-start space-x-4 space-y-4">
          <FilterSearch />
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
