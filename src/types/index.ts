import type { User } from "@prisma/client"

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "hashedPassword"
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | undefined
}
