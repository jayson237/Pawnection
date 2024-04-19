import { getCurrentUser } from "@/lib/actions/user"
import { redirect } from "next/navigation"

export default async function lostAndFound() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  return redirect("/lostAndFound/losses")
}
