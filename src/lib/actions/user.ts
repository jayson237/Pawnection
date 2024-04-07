import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/prismadb"
import { SafeUser } from "@/types"
import { User } from "@prisma/client"
import { getServerSession } from "next-auth/next"

export async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      include: {
        followerUsers: true,
        followingUsers: true,
      },
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

export async function getAllUsers(
  cursorId: string | null,
  username?: string | null,
): Promise<User[] | null> {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return null
    }
    let cursorCondition = {}
    if (cursorId) {
      cursorCondition = {
        cursor: { id: cursorId },
        skip: 1,
      }
    }

    let users: User[] = []
    if (!username) {
      users = await prisma.user.findMany({
        ...cursorCondition,
        take: 10,
        include: {
          followerUsers: true,
          followingUsers: true,
        },
      })
    } else {
      users = await prisma.user.findMany({
        ...cursorCondition,
        where: {
          username: {
            contains: username,
          },
        },
        take: 10,
        include: {
          followerUsers: true,
          followingUsers: true,
        },
      })
    }
    return users
  } catch (error) {
    return null
  }
}

export async function getOneUser(username: string): Promise<SafeUser | null> {
  try {
    const currentUser = await getCurrentUser()

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        followerUsers: {
          include: {
            following: {
              select: {
                username: true,
                image: true,
              },
            },
          },
          take: 20,
        },
        followingUsers: {
          include: {
            follower: {
              select: {
                username: true,
                image: true,
              },
            },
          },
          take: 20,
        },
      },
    })
    if (!user) {
      return null
    }

    const { hashedPassword, followerUsers, followingUsers, ...rest } = user

    const followers = followerUsers.map((data) => ({
      ...data.following,
      isCurrentFollowed:
        currentUser?.followingUsers
          ?.map((x) => x.followerId)
          .includes(data.followingId) ||
        currentUser?.username === data.following.username,
    }))
    const following = followingUsers.map((data) => ({
      ...data.follower,
      isCurrentFollowed:
        currentUser?.followingUsers
          ?.map((x) => x.followerId)
          .includes(data.followerId) ||
        currentUser?.username === data.follower.username,
    }))

    return {
      ...rest,
      followers,
      following,
      emailVerified: rest.emailVerified?.toISOString(),
      createdAt: rest.createdAt.toISOString(),
      updatedAt: rest.updatedAt.toISOString(),
      isCurrentFollowed: currentUser?.followingUsers
        ?.map((x) => x.followerId)
        .includes(user.id),
    }
  } catch (error) {
    return null
  }
}

export async function followUser(
  following_id: string,
  followers_id: string,
): Promise<boolean> {
  try {
    await prisma.userRelation.create({
      data: {
        followingId: following_id,
        followerId: followers_id,
      },
    })

    return true
  } catch (error) {
    return false
  }
}

export async function unfollowUser(
  following_id: string,
  follower_id: string,
): Promise<boolean> {
  try {
    await prisma.userRelation.delete({
      where: {
        followerId_followingId: {
          followerId: follower_id,
          followingId: following_id,
        },
      },
    })

    return true
  } catch (error) {
    return false
  }
}
