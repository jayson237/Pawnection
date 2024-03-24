import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/prismadb"
import { getServerSession } from "next-auth/next"

import { SafeUser } from "../types"

export default async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        followerUsers: true,
        followingUsers: true,
      },
    })

    if (!currentUser) {
      return null
    }

    const { hashedPassword, ...rest } = currentUser

    return {
      ...rest,
      emailVerified: rest.emailVerified?.toISOString(),
      createdAt: rest.createdAt.toISOString(),
      updatedAt: rest.updatedAt.toISOString(),
    }
  } catch (error) {
    return null
  }
}
