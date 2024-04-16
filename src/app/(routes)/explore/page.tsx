import Feed from "@/components/explore/Feed"
import SearchBar from "@/components/explore/SearchBar"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function Explore({
  searchParams,
}: {
  searchParams: {
    q: string
    type: "post" | "users" | "petSitting"
    following: string
  }
}) {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")

  return (
    <div className="flex justify-center w-full max-w-[1240px] mx-auto md:px-0 px-6">
      <div className="py-[40px]">
        <div className="flex flex-col mx-auto space-y-4">
          <SearchBar />
          <Feed currentUser={currUser} searchParams={searchParams} />
        </div>
      </div>
    </div>
  )
}
