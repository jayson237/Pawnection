import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function lostAndFound() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (currUser && !currUser.username) redirect("/settings")
  return redirect("/lostAndFound/losses")
}
