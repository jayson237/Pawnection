import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const creatorId = searchParams.get("id") as string

    const user = await prisma.user.findUnique({
      where: { id: creatorId },
      select: {
        name: true,
        image: true,
        email: true,
      },
    })

    if (!user) {
      return NextResponse.json(null)
    }

    return NextResponse.json(user)
  } catch (error) {
    console.log("error at api: ", error)
    return NextResponse.json(error)
  }
}
