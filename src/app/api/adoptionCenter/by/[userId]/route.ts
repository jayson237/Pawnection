import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      )
    }

    const getAllOwnAdoptablePet = await prisma.adoptablePet.findMany({
      where: {
        adoptionCentreId: params.userId,
      },
    })
    return NextResponse.json({ data: getAllOwnAdoptablePet }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
