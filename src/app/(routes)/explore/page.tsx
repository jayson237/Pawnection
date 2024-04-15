import Feed from "@/components/explore/Feed"
import SearchBar from "@/components/explore/SearchBar"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function Explore() {
  // const currUser = await getCurrentUser()
  // if (!currUser) redirect("/auth")

  // return (
  //   <div className="flex justify-center w-full max-w-[1240px] mx-auto md:px-0 px-4">
  //     <div className="py-[40px]">
  //       <div className="flex flex-col space-x-4 space-y-4">
  //         <WrapperFeeds currentUser={currUser} />
  //         {/* <SearchBar />
  //         <Feed currentUser={currUser} searchParams={searchParams} /> */}
  //       </div>
  //     </div>
  //   </div>
  // )
  redirect("/explore/post")
}
