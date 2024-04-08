import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
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
    await prisma.$transaction(async (tx) => {
      const likePost = await tx.like.create({
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
        return NextResponse.json(
          { message: "Please try again" },
          { status: 400 },
        )
      }

      const updateLikeCount = await tx.post.update({
        data: {
          likes_count: {
            increment: 1,
          },
        },
        where: {
          id: postId,
        },
      })
      if (!updateLikeCount) {
        return NextResponse.json(
          { message: "Failed to update count" },
          { status: 404 },
        )
      }
    })

    return NextResponse.json({ message: "Post liked" }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
