import Profile from "@/components/profile/Profile"
import { getCurrentUser } from "@/lib/actions/user"
import { getOneUser } from "@/lib/actions/user"
import { notFound } from "next/navigation"
import { redirect } from "next/navigation"

export default async function UserProfile({
  params,
}: {
  params: { username: string }
}) {
  const username = params.username
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect("/auth")
  if (currentUser && !currentUser.username) redirect("/settings")
  const user = await getOneUser(username)

  const isProfileOwner = currentUser?.username === username

  if (!user) {
    return notFound()
  } else {
    return (
      <Profile
        user={user}
        isProfileOwner={isProfileOwner}
        currentUser={currentUser}
      />
    )
  }
}
