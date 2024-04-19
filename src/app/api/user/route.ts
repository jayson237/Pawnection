import { getCurrentUser } from "@/lib/actions/user"
import { getAllUsers } from "@/lib/actions/user"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const cursor = searchParams.get("cursor")
    const username = searchParams.get("q")

    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      )
    }
    const posts = await getAllUsers(cursor, username)
    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
