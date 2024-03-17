import getCurrentUser from "@/actions/getCurrentUser"
import prisma from "@/lib/prismadb"
import { UserType } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()
  const { type }: { type: number } = await req.json()
  if (type > 2 || type <= 0)
    return NextResponse.json(
      {
        message: "Invalid choice",
      },
      {
        status: 400,
      },
    )

  const userType = type == 1 ? UserType.PetLover : UserType.PetAdoptionCentre

  const set = await prisma.user.update({
    where: {
      email: currentUser?.email,
    },
    data: {
      type: userType,
    },
  })

  if (!set)
    return NextResponse.json(
      {
        message: "Unable to set user type",
      },
      {
        status: 400,
      },
    )
  return NextResponse.json(
    {
      message: "You are all set!",
    },
    {
      status: 200,
    },
  )
}
