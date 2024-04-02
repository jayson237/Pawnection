import type { User } from "@prisma/client"

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "hashedPassword"
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | undefined
  following?: {
    username: string | null
    image: string | null
    isCurrentFollowed?: boolean
  }[]
  followers?: {
    username: string | null
    image: string | null
    isCurrentFollowed?: boolean
  }[]
  followingUsers?: {
    id: string
    followerId: string
    followingId: string
  }[]
  followerUsers?: {
    id: string
    followerId: string
    followingId: string
  }[]
  isCurrentFollowed?: boolean
}

export type FollowType =
  | {
      username: string | null
      image: string | null
      isCurrentFollowed?: boolean
    }[]
  | undefined

export type FollowItemType = {
  username: string | null
  image: string | null
  isCurrentFollowed?: boolean
}

export enum PetGender {
  male = "Male",
  female = "Female",
}

export enum FolderType {
  adoptable = "adoptable",
  post = "post",
  avatar = "avatar",
}

export interface PostData {
  imageUrl: string
  description?: string
  type: string
}
