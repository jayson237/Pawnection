import getCurrentUser from "@/actions/getCurrentUser"
import ProfilePage from "@/components/profile/ProfilePage"

export default async function profile() {
  const currentUser = await getCurrentUser()
  return <ProfilePage currentUser={currentUser} />
}
