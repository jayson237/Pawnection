import getCurrentUser from "@/actions/getCurrentUser"
import prisma from "@/lib/prismadb"
import { UserType } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()
  const { username }: { username: string } = await req.json()

  if (!username)
    return NextResponse.json(
      {
        message: "No username provided",
      },
      {
        status: 400,
      },
    )

  const set = await prisma.user.update({
    where: {
      email: currentUser?.email,
    },
    data: {
      username: username,
    },
  })

  if (!set)
    return NextResponse.json(
      {
        message: "Unable to set username",
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