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

  const likeRecord = await prisma.like.findFirst({
    where: {
      postId: postId,
      userId: currentUser.id,
    },
  })

  if (!likeRecord) {
    return NextResponse.json(
      { message: "Like not found or could not be removed" },
      { status: 400 },
    )
  }

  const deleteLike = await prisma.like.delete({
    where: {
      id: likeRecord.id,
    },
  })

  if (!deleteLike) {
    return NextResponse.json(
      { message: "Unable to remove, please try again" },
      { status: 400 },
    )
  }

  return NextResponse.json({ message: "Like removed" }, { status: 200 })
}
