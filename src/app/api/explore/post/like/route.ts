import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json(
      {
        message:
          "You are not authorized to perform this action, please log in first",
      },
      { status: 401 },
    )
  }

  const { postId }: { postId: string } = await req.json()
  const getPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!getPost) {
    return NextResponse.json({ message: "Post not found" }, { status: 400 })
  }

  const likePost = await prisma.like.create({
    data: {
      post: {
        connect: {
          id: postId,
        },
      },
      user: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  })

  if (!likePost) {
    return NextResponse.json({ message: "Please try again" }, { status: 400 })
  }
  return NextResponse.json({ message: "Post liked" }, { status: 200 })
}
