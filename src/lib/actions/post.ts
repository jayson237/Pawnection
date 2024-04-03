import prisma from "@/lib/prismadb"

import { getCurrentUser } from "./user"

export async function getAllPosts() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return null
    }
    const posts = await prisma.post.findMany({
      take: 20,
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
    return posts
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
