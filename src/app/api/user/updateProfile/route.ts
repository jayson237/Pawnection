import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser()
  try {
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await request.json()

    const findUsername = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    })

    if (findUsername && findUsername?.id !== currentUser?.id) {
      return NextResponse.json(
        {
          message: "Username already exists",
        },
        {
          status: 400,
        },
      )
    }

    const updatedProfile = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name: data.name,
        username: data.username,
        phone: data.phone,
        image: data.image,
        bio: data.bio,
      },
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.log("Update error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
