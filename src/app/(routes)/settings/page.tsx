import Settings from "@/components/profile/Settings"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function profile() {
  const currentUser = await getCurrentUser()
<<<<<<< HEAD
  console.log(currentUser)
=======
  if (!currentUser) redirect("/auth")
>>>>>>> 60fee3f95acdc419b0d23afa57f8395ccc9585b9

  return (
    <div className="flex h-full w-full place-content-center place-items-center">
      <Settings currentUser={currentUser} />
    </div>
  )
}
