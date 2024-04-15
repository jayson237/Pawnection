import { redirect } from "next/navigation"
import React from "react"

import ExplorePetSitting from "../../../../components/explore/ExplorePetSitting"
import ExplorePost from "../../../../components/explore/ExplorePost"
import ExploreUsers from "../../../../components/explore/ExploreUsers"
import SearchBar from "../../../../components/explore/SearchBar"
import { getCurrentUser } from "../../../../lib/actions/user"

async function ExploreTypePage({
  params,
}: {
  params: {
    exploreType: string
  }
}) {
  const exploreType = params.exploreType
  if (
    exploreType !== "post" &&
    exploreType !== "users" &&
    exploreType !== "pet-sitting"
  )
    redirect("/explore")

  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")

  return (
    <div className="flex justify-center w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[40px]">
        <div className="flex flex-col space-x-4 space-y-4">
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
