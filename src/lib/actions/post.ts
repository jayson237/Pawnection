import prisma from "@/lib/prismadb"
import { SafeUser } from "@/types"
import { Comment, Like, Post, User } from "@prisma/client"

import { getCurrentUser } from "./user"

type ExtendedPost = Post & {
  comments: (Comment & { user: User })[]
  likes: (Like & { user: SafeUser })[]
  user: User & {
    followerUsers: { id: string; followerId: string; followingId: string }[]
    followingUsers: { id: string; followerId: string; followingId: string }[]
  }
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

export async function getAllPosts(): Promise<ExtendedPost[] | null> {
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

    const postsWithLimitedComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await prisma.comment.findMany({
          where: { postId: post.id },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
        })

        return {
          ...post,
          comments: comments.map((comment) => ({
            ...comment,
            user: comment.user,
          })),
          likes: post.likes.map((like) => ({
            ...like,
            user: transformUserToSafeUser(like.user),
          })),
        }
      }),
    )

    return postsWithLimitedComments as ExtendedPost[]
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
        user: true,
      },
    })
    return post
  } catch (error) {
    console.log(error)
    return null
  }
}
