import getCurrentUser from "@/actions/getCurrentUser"
import PublicProfile from "@/components/profile/PublicProfile"

export default async function Profile({
  params,
}: {
  params: { username: string }
}) {
  const username = params.username
  console.log(username)
  const currentUser = await getCurrentUser()

  return <PublicProfile />
}
