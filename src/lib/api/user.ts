import prisma from "@/lib/prismadb"

import { SafeUser } from "../../types"
import getCurrentUser from "../actions/getCurrentUser"

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
      ...data.following, // see who was following us, so it became followers, agak bingung si but ok
      isCurrentFollowed:
        currentUser?.followingUsers
          ?.map((x) => x.followerId)
          .includes(data.followingId) ||
        currentUser?.username === data.following.username,
    }))
    const following = followingUsers.map((data) => ({
      ...data.follower, // for search who user was following, we then fetch from user follower, but it must followed right? hm
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
