import FilterSearch from "@/components/explore/FilterSearch"
import PostForm from "@/components/explore/PostForm"
import getCurrentUser from "@/lib/actions/getCurrentUser"
import { redirect } from "next/navigation"

export default async function Community() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  return (
    <div className="w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[40px] px-16">
        <div className="mx-auto flex flex-row items-center space-x-4">
          <FilterSearch />
        </div>
      </div>
    </div>
  )
}
