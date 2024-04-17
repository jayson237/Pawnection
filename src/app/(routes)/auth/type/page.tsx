import TypeForm from "@/components/auth/TypeForm"
import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function AuthType() {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect("/auth")
  if (currentUser.type) redirect("/")

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center pb-24 ">
      <TypeForm />
    </div>
  )
}
