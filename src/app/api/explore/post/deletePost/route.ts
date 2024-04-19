import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    )
  }
  const { postId }: { postId: string } = await req.json()

  const getPost = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  })

  const deletePost = await prisma.post.delete({
    where: {
      id: postId,
    },
  })

  if (!getPost || !deletePost)
    return NextResponse.json(
      {
        message: "Error deleting post, please try again",
      },
      {
        status: 400,
      },
    )

  return NextResponse.json(
    {
      message: "Successful! Please wait for to be redirected",
    },
    {
      status: 200,
    },
  )
}
