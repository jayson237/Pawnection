import prisma from "@/lib/prismadb"
import { User } from "@prisma/client"

import { getCurrentUser } from "./user"

const transformUserToSafeUser = (user: User) => {
  const { hashedPassword, ...rest } = user
  return {
    ...rest,
    emailVerified: rest.emailVerified?.toISOString(),
    createdAt: rest.createdAt.toISOString(),
    updatedAt: rest.updatedAt.toISOString(),
  }
}

export async function getAllPosts() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return null
    }

    const posts = await prisma.post.findMany({
      include: {
        likes: {
          include: {
            user: true,
          },
        },
        user: {
          include: {
            followerUsers: true,
            followingUsers: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const transformedPosts = posts.map((post) => ({
      ...post,
      likes: post.likes.map((like) => ({
        ...like,
        user: transformUserToSafeUser(like.user),
      })),
      user: post.user,
    }))

    return transformedPosts
  } catch (error) {
    console.log(error)
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
        user: true,
      },
    })
    return post
  } catch (error) {
    console.log(error)
    return null
  }
}
