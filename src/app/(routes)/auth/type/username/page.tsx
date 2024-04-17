import UsernameForm from "@/components/auth/UsernameForm"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function AuthUsername() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (currUser.username) redirect("/")

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center pb-24">
      <UsernameForm />
    </div>
  )
}
