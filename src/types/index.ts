import type { User } from "@prisma/client"

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "hashedPassword"
> & {
  createdAt: string
  updatedAt: string
  emailVerified?: string
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

export enum PetGender {
  male = "Male",
  female = "Female",
}
