import getCurrentUser from "@/actions/getCurrentUser"
import UsernameForm from "@/components/auth/UsernameForm"
import { redirect } from "next/navigation"

export default async function AuthUsername() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (currUser.username) redirect("/")

  return (
    <div className="h-full w-full flex flex-col place-content-center place-items-center">
      <UsernameForm />
    </div>
  )
}
