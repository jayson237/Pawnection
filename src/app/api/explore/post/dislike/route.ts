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
      const deleteLike = await tx.like.delete({
        where: {
          userId_postId: {
            userId: currentUser.id,
            postId: postId,
          },
        },
      })
      if (!deleteLike) {
        return NextResponse.json(
          { message: "Unable to remove, please try again" },
          { status: 400 },
        )
      }

      const updateLikeCount = await tx.post.update({
        data: {
          likes_count: {
            decrement: 1,
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

    return NextResponse.json({ message: "Like removed" }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
