import { getAllPosts } from "@/lib/actions/post"
import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { PostData } from "@/types"
import { PostType } from "@prisma/client"
import { NextResponse } from "next/server"

async function createPost({
  imageUrl,
  description,
  type,
  userEmail,
}: PostData & { userEmail: string }) {
  const postType = type === "post" ? PostType.Post : PostType.PetSitting
  try {
    const post = await prisma.post.create({
      data: {
        imageUrl,
        description,
        type: postType,
        user: {
          connect: {
            email: userEmail,
          },
        },
      },
    })
    return post
  } catch (error) {
    console.error("Failed to create post:", error)
    throw new Error("Unable to create post, please try again")
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const cursor = searchParams.get("cursor")
    const type = searchParams.get("type")
    const seachTerm = searchParams.get("q")
    const following = searchParams.get("following")

    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      )
    }
    const posts = await getAllPosts(
      cursor,
      type,
      seachTerm || "",
      following || "false",
      currentUser,
    )
    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
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

    const { imageUrl, description, type }: PostData = await req.json()
    if (!imageUrl) {
      return NextResponse.json(
        { message: "No image provided" },
        { status: 400 },
      )
    }

    const post = await createPost({
      imageUrl,
      description,
      type,
      userEmail: currentUser.email,
    })
    return NextResponse.json(
      { message: "Post created successfully", post },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    )
  }
  const { newDescription, postId }: { newDescription: string; postId: string } =
    await request.json()

  const getPost = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  })

  if (!getPost) {
    return NextResponse.json(
      {
        message: "Post not found",
      },
      { status: 404 },
    )
  }

  const updatePost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      description: newDescription,
    },
  })

  if (!updatePost) {
    return NextResponse.json(
      {
        message: "Error updating post, please try again",
      },
      { status: 400 },
    )
  }

  return NextResponse.json(
    { message: "Post updated successfully" },
    { status: 200 },
  )
}
