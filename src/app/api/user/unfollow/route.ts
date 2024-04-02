import { getCurrentUser } from "@/lib/actions/user"
import { unfollowUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    )
  }
  const { username }: { username: string } = await req.json()
  if (!username)
    return NextResponse.json(
      {
        message: "",
      },
      {
        status: 400,
      },
    )

  const findUser = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (!findUser || findUser.id === currentUser.id)
    return NextResponse.json(
      {
        message: "",
      },
      {
        status: 400,
      },
    )

  await unfollowUser(currentUser.id as string, findUser.id)

  return NextResponse.json(
    {
      message: "Unfollowed",
    },
    {
      status: 200,
    },
  )
}
