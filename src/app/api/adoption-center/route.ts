import getCurrentUser from "@/actions/getCurrentUser"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"
import { z } from "zod"

import { SafeUser } from "../../../types"
import {
  AdoptablePetPayloadSchema,
  AdoptablePetPayloadType,
} from "../../../types/adoption-center"

async function createAdopablePet(
  payload: AdoptablePetPayloadType,
  currentUser: SafeUser,
) {
  try {
    await prisma.adoptablePet.create({
      data: {
        age: payload.age,
        breed: payload.breed,
        description: payload.description,
        gender: payload.gender,
        imageUrl: payload.imageUrl,
        name: payload.name,
        type: payload.type,
        adoptionCentre: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    })
    return true
  } catch (error) {
    console.error("Failed to create post:", error)
    throw new Error("Unable to create post, please try again")
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.type === "PetLover") {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      )
    }

    const payload: AdoptablePetPayloadType = AdoptablePetPayloadSchema.parse(
      await req.json(),
    )

    const post = await createAdopablePet(payload, currentUser)
    return NextResponse.json(
      { message: "Post created successfully", post },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.type === "PetLover") {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      )
    }

    const getAllOwnAdoptablePet = await prisma.adoptablePet.findMany({
      where: {
        adoptionCentreId: currentUser.id,
      },
      take: 20,
    })
    return NextResponse.json({ data: getAllOwnAdoptablePet }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
