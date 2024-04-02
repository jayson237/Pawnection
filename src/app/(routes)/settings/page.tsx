import Settings from "@/components/profile/Settings"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function profile() {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect("/auth")

  return (
    <div className="flex h-full w-full place-content-center place-items-center">
      <Settings currentUser={currentUser} />
    </div>
  )
}
