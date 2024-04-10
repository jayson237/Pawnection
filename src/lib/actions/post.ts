import prisma from "@/lib/prismadb"
import { Like, Post, PostType, User } from "@prisma/client"

import { SafeUser } from "../../types"
import { getCurrentUser } from "./user"

export type ExtendedPost = Post & {
  likes: Like[]
  user: Pick<User, "username" | "image" | "id">
  isCurrentUserLike: boolean
}

const transformUserToSafeUser = (user: User) => {
  const { hashedPassword, ...rest } = user
  return {
    ...rest,
    emailVerified: rest.emailVerified?.toISOString(),
    createdAt: rest.createdAt.toISOString(),
    updatedAt: rest.updatedAt.toISOString(),
  }
}

export async function getAllPosts(
  cursorId: string | null,
  type: string | null,
  searchTerm: string,
  following: string,
): Promise<ExtendedPost[] | null> {
  try {
    const currentUser = await getCurrentUser()
    let cursorCondition = {}
    if (cursorId) {
      cursorCondition = {
        cursor: { id: cursorId },
        skip: 1,
      }
    }

    if (following === "true") {
      const followingUserIds = currentUser?.followingUsers?.map(
        (followingUser) => followingUser.followerId,
      )
      const posts = await prisma.post.findMany({
        where: {
          type: type === "post" ? PostType.Post : PostType.PetSitting,
          description: {
            contains: searchTerm,
          },
          userId: {
            in: followingUserIds,
          },
        },
        include: {
          likes: {
            where: {
              userId: currentUser?.id,
            },
          },
          user: {
            select: {
              username: true,
              image: true,
              id: true,
            },
          },
        },
        take: 20,
        orderBy: {
          createdAt: "desc",
        },
        ...cursorCondition,
      })
      return posts.map((x) => ({
        ...x,
        isCurrentUserLike: x.likes.length > 0,
      }))
    } else {
      const posts = await prisma.post.findMany({
        where: {
          type: type === "post" ? PostType.Post : PostType.PetSitting,
          description: {
            contains: searchTerm,
          },
        },
        include: {
          likes: {
            where: {
              userId: currentUser?.id,
            },
          },
          user: {
            select: {
              username: true,
              image: true,
              id: true,
            },
          },
        },
        take: 20,
        orderBy: {
          createdAt: "desc",
        },
        ...cursorCondition,
      })
      return posts.map((x) => ({
        ...x,
        isCurrentUserLike: x.likes.length > 0,
      }))
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getAllProfilePosts(
  cursorId: string | null,
  searchTerm: string,
  userId: string,
  currentUser: SafeUser,
): Promise<ExtendedPost[] | null> {
  try {
    let cursorCondition = {}
    if (cursorId) {
      cursorCondition = {
        cursor: { id: cursorId },
        skip: 1,
      }
    }

    const posts = await prisma.post.findMany({
      where: {
        userId,
        description: {
          contains: searchTerm,
        },
      },
      include: {
        likes: {
          where: {
            userId: currentUser?.id,
          },
        },
        user: {
          select: {
            username: true,
            image: true,
            id: true,
          },
        },
      },
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
      ...cursorCondition,
    })
    return posts.map((x) => ({
      ...x,
      isCurrentUserLike: x.likes.length > 0,
    }))
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getOnePost(id: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return null
    }
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      include: {
        likes: true,
        comments: {
          include: {
            user: true,
          },
        },
        user: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    })
    return post
  } catch (error) {
    console.log(error)
    return null
  }
}
