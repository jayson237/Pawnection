import getCurrentUser from "@/actions/getCurrentUser"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

interface PostData {
  imageUrl: string
  description?: string
}

async function createPost({
  imageUrl,
  description,
  userEmail,
}: PostData & { userEmail: string }) {
  try {
    const post = await prisma.post.create({
      data: {
        imageUrl,
        description,
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

    const { imageUrl, description }: PostData = await req.json()
    if (!imageUrl) {
      return NextResponse.json(
        { message: "No image provided" },
        { status: 400 },
      )
    }

    const post = await createPost({
      imageUrl,
      description,
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
