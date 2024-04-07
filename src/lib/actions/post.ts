import prisma from "@/lib/prismadb"
import { SafeUser } from "@/types"
import { Comment, Like, Post, PostType, User } from "@prisma/client"

import { getCurrentUser } from "./user"

type ExtendedPost = Post & {
  comments: (Comment & { user: User })[]
  likes: (Like & { user: SafeUser })[]
  user: User
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
    let posts: (Post & { likes: (Like & { user: User })[] })[] = []

    if (following === "true") {
      const followingUserIds = currentUser?.followingUsers?.map(
        (followingUser) => followingUser.followerId,
      )
      posts = await prisma.post.findMany({
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
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
        ...cursorCondition,
      })
    } else {
      posts = await prisma.post.findMany({
        where: {
          type: type === "post" ? PostType.Post : PostType.PetSitting,
          description: {
            contains: searchTerm,
          },
        },
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
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
        ...cursorCondition,
      })
    }

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
