import prisma from "@/lib/prismadb"

import { SafeUser } from "../types"

export async function getOneUser(username: string): Promise<SafeUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })
    if (!user) {
      return null
    }

    const { hashedPassword, ...rest } = user

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
