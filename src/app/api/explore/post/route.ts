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
