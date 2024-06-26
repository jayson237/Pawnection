import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser()
  try {
    const data = await request.json()
    const updatedProfile = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        image: data.image,
      },
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.log("Update error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
