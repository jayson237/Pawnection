import Settings from "@/components/profile/Settings"
import { getCurrentUser } from "@/lib/actions/user"

export default async function profile() {
  const currentUser = await getCurrentUser()
  console.log(currentUser)

  return (
    <div className="flex h-full w-full place-content-center place-items-center">
      <Settings currentUser={currentUser} />
    </div>
  )
}
