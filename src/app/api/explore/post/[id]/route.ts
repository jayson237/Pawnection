import { getAllProfilePosts } from "@/lib/actions/post"
import { getCurrentUser } from "@/lib/actions/user"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string
    }
  },
) {
  try {
    const { searchParams } = new URL(req.url)
    const cursor = searchParams.get("cursor")
    const seachTerm = searchParams.get("q")

    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      )
    }
    const posts = await getAllProfilePosts(
      cursor,
      seachTerm || "",
      params.id,
      currentUser,
    )
    return NextResponse.json(
      {
        data: posts,
      },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
