import getCurrentUser from "@/actions/getCurrentUser"
import Settings from "@/components/profile/Settings"

export default async function profile() {
  const currentUser = await getCurrentUser()
  return (
    <div className="flex h-full w-full place-content-center place-items-center">
      <Settings currentUser={currentUser} />
    </div>
  )
}