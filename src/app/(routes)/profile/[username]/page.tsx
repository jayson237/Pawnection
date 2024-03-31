import Profile from "@/components/profile/Profile"
import { getCurrentUser } from "@/lib/actions/user"
import { notFound } from "next/navigation"

import { getOneUser } from "../../../../lib/actions/user"

export default async function UserProfile({
  params,
}: {
  params: { username: string }
}) {
  const username = params.username
  const currentUser = await getCurrentUser()
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
