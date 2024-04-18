import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const postId = params.id
    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 },
      )
    }
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

    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(
      { message: "Comment created successfully", data: comments },
      { status: 200 },
    )
  } catch (error) {
    console.error("Failed to create comment:", error)
    return NextResponse.json(
      { message: "An error occurred, please try again" },
      { status: 500 },
    )
  }
}
