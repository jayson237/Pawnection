import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/prismadb"
import { getServerSession } from "next-auth/next"

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
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
