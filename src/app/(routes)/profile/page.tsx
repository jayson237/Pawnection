import getCurrentUser from "@/actions/getCurrentUser"
import ProfilePage from "@/components/profile/ProfilePage"
import { User } from "@prisma/client"

export default async function profile() {
  const currentUser = await getCurrentUser()
  return <ProfilePage currentUser={currentUser as unknown as User} />
}
