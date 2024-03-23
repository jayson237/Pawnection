import getCurrentUser from "@/actions/getCurrentUser"
import Profile from "@/components/profile/Profile"

export default async function UserProfile({
  params,
}: {
  params: { username: string }
}) {
  const username = params.username
  const currentUser = await getCurrentUser()

  return <Profile />
}
