import getCurrentUser from "@/lib/actions/getCurrentUser"
import prisma from "@/lib/prismadb"
import { AdoptablePetStatus } from "@prisma/client"
import Link from "next/link"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import React from "react"

import { SafeUser } from "../../../../types"
import {
  CreateAdoptablePetPayloadSchema,
  CreateAdoptablePetPayloadType,
  EditAdoptablePetPayloadSchema,
  EditAdoptablePetPayloadType,
} from "../../../../types/adoption-center"

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
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

    const getAllOwnAdoptablePet = await prisma.adoptablePet.findFirst({
      where: {
        adoptionCentreId: currentUser.id,
        id: params.id,
      },
      take: 20,
    })
    return NextResponse.json({ data: getAllOwnAdoptablePet }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

async function editAdopablePet(
  payload: EditAdoptablePetPayloadType,
  currentUser: SafeUser,
  id: string,
) {
  try {
    const findOne = await prisma.adoptablePet.findFirst({
      where: {
        id: id,
        adoptionCentre: {
          id: currentUser.id,
        },
      },
    })
    if (!findOne) return false
    await prisma.adoptablePet.update({
      data: {
        status: payload.status,
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
      where: {
        id: id,
      },
    })
    return true
  } catch (error) {
    console.error("Failed to edit post:", error)
    throw new Error("Unable to edit post, please try again")
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
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

    const payload: EditAdoptablePetPayloadType =
      EditAdoptablePetPayloadSchema.parse(await req.json())

    const edit = await editAdopablePet(payload, currentUser, params.id)
    if (!edit) {
      return NextResponse.json({ message: "Failed to edit" }, { status: 400 })
    }
    return NextResponse.json(
      { message: "Pet edited successfully" },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

async function dateleAdopablePet(currentUser: SafeUser, id: string) {
  try {
    const findOne = await prisma.adoptablePet.findFirst({
      where: {
        id: id,
        adoptionCentre: {
          id: currentUser.id,
        },
      },
    })
    if (!findOne) return false
    await prisma.adoptablePet.delete({
      where: {
        id: id,
      },
    })
    return true
  } catch (error) {
    console.error("Failed to delete post:", error)
    throw new Error("Unable to delete post, please try again")
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
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

    const dlt = await dateleAdopablePet(currentUser, params.id)
    if (!dlt) {
      return NextResponse.json({ message: "Failed to delete" }, { status: 400 })
    }
    return NextResponse.json(
      { message: "Pet deleted successfully" },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
