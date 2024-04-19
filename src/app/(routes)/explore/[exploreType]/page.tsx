import ExplorePetSitting from "@/components/explore/ExplorePetSitting"
import ExplorePost from "@/components/explore/ExplorePost"
import ExploreUsers from "@/components/explore/ExploreUsers"
import SearchBar from "@/components/explore/SearchBar"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"
import React from "react"

async function ExploreTypePage({
  params,
}: {
  params: {
    exploreType: string
  }
}) {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (currUser && !currUser.username) redirect("/settings")
  const exploreType = params.exploreType

  if (
    exploreType !== "post" &&
    exploreType !== "users" &&
    exploreType !== "pet-sitting"
  )
    redirect("/explore")

  return (
    <div className="flex justify-center w-full max-w-[1240px] mx-auto md:px-0 px-6">
      <div className="py-[40px]">
        <div className="flex flex-col mx-auto space-y-4">
          <SearchBar />
          {exploreType === "post" && <ExplorePost currentUser={currUser} />}
          {exploreType === "pet-sitting" && (
            <ExplorePetSitting currentUser={currUser} />
          )}
          {exploreType === "users" && <ExploreUsers currentUser={currUser} />}
        </div>
      </div>
    </div>
  )
}

export default ExploreTypePage
