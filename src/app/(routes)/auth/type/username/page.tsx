import UsernameForm from "@/components/auth/UsernameForm"
import { getCurrentUser } from "@/lib/actions/user"
import { UserType } from "@prisma/client"
import { redirect } from "next/navigation"

export default async function AuthUsername() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (currUser.username) redirect("/")
  if (currUser.type === UserType.PetAdoptionCentre) redirect("/adoptionCenter")
  else if (currUser.type === UserType.PetLover) redirect("/adoption")

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center pb-24">
      <UsernameForm />
    </div>
  )
}
