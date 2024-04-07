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

    const { commentId }: { commentId: string } = await req.json()
    if (!commentId) {
      return NextResponse.json(
        { message: "CommentId is required" },
        { status: 400 },
      )
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 },
      )
    }

    if (comment.userId !== currentUser.id) {
      return NextResponse.json(
        { message: "You do not have permission to delete this comment" },
        { status: 403 },
      )
    }

    await prisma.comment.deleteMany({
      where: {
        OR: [{ id: commentId }, { parentId: commentId }],
      },
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
