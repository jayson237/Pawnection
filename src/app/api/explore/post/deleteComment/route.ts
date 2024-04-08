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
            "You are not authorized to perform this action, please log in first.",
        },
        { status: 401 },
      )
    }

    const { commentId, postId }: { commentId: string; postId: string } =
      await req.json()
    if (!commentId) {
      return NextResponse.json(
        { message: "CommentId is required" },
        { status: 400 },
      )
    }

    await prisma.$transaction(async (tx) => {
      const dlt = await tx.comment.deleteMany({
        where: {
          OR: [
            { id: commentId, userId: currentUser.id },
            { parentId: commentId, userId: currentUser.id },
          ],
        },
      })
      const numberOfCommentDeleted = dlt.count

      await tx.post.update({
        data: {
          comments_count: {
            decrement: numberOfCommentDeleted,
          },
        },
        where: {
          id: postId,
        },
      })

      if (!dlt) {
        return NextResponse.json(
          { message: "Failed to delete comment" },
          { status: 400 },
        )
      }
    })

    return NextResponse.json(
      { message: "Comment and its children deleted successfully" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Failed to delete comment:", error)
    return NextResponse.json(
      { message: "An error occurred, please try again" },
      { status: 500 },
    )
  }
}
