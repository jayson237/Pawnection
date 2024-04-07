import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

type CommentData = {
  content: string
  postId: string
  parentId?: string
}

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

    const { content, postId, parentId }: CommentData = await req.json()
    if (!content || !postId) {
      return NextResponse.json(
        { message: "Content and postId are required" },
        { status: 400 },
      )
    }

    const postExists = await prisma.post.findUnique({
      where: { id: postId },
    })
    if (!postExists) {
      return NextResponse.json({ message: "Post not found" }, { status: 400 })
    }

    if (parentId) {
      const parentCommentExists = await prisma.comment.findUnique({
        where: { id: parentId },
      })
      if (!parentCommentExists) {
        return NextResponse.json(
          { message: "Parent comment not found" },
          { status: 400 },
        )
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: currentUser.id,
        postId,
        ...(parentId && { parentId }),
      },
    })

    return NextResponse.json(
      { message: "Comment created successfully", comment },
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

export async function PUT(req: Request) {
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
  const {
    commentId,
    updatedContent,
  }: { commentId: string; updatedContent: string } = await req.json()
  if (!commentId || !updatedContent) {
    return NextResponse.json(
      { message: "CommentId and updatedContent are required" },
      { status: 400 },
    )
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  })
  if (!comment) {
    return NextResponse.json({ message: "Comment not found" }, { status: 404 })
  }

  if (updatedContent === comment.content) {
    return NextResponse.json(
      { message: "No changes detected, comment not updated" },
      { status: 400 },
    )
  }
  const updateComment = await prisma.comment.update({
    where: { id: commentId },
    data: { content: updatedContent },
  })

  if (!updateComment) {
    return NextResponse.json(
      { message: "Failed to update comment, please try again" },
      { status: 500 },
    )
  }

  return NextResponse.json(
    { message: "Comment updated successfully" },
    { status: 200 },
  )
}
