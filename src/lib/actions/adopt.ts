import prisma from "@/lib/prismadb"

import { getCurrentUser } from "./user"

export const getAllAdoptablePets = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return null
    }
    const adoptablePets = await prisma.adoptablePet.findMany({
      take: 20,
      include: {
        adoptionCentre: {
          select: {
            username: true,
          },
        },
      },
    })
    return adoptablePets
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getOneAdoptablePets = async (id: string) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return null
    }
    const adoptablePet = await prisma.adoptablePet.findFirst({
      where: {
        id: id,
      },
      take: 20,
      include: {
        adoptionCentre: {
          select: {
            username: true,
          },
        },
      },
    })
    return adoptablePet
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getAllOwnAdpotRequests = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return null
    }

    const ownrequests = await prisma.adoptionRequest.findMany({
      where: {
        user: {
          id: currentUser.id,
        },
      },
      include: {
        adoptablePet: true,
      },
    })

    return ownrequests
  } catch (error) {
    console.log(error)
    return null
  }
}
