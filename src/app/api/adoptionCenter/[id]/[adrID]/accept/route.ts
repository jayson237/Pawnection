import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { AdoptRequestStatus, AdoptablePetStatus } from "@prisma/client"
import { NextResponse } from "next/server"

async function acceptAdoptionRequest(
  adoptablePetID: string,
  adoptionRequestID: string,
) {
  try {
    const find = await prisma.adoptablePet.findFirst({
      where: {
        id: adoptablePetID,
      },
    })
    if (find?.status == "Adopted") {
      throw new Error("Pet has been adopted.")
    }
    await prisma.adoptablePet.update({
      data: {
        status: AdoptablePetStatus.Adopting,
      },
      where: {
        id: adoptablePetID,
      },
    })

    await prisma.adoptionRequest.update({
      data: {
        request_status: AdoptRequestStatus.Approved,
      },
      where: {
        id: adoptionRequestID,
      },
    })
    return true
  } catch (error) {
    console.error("Failed to accept the pet adopt request:", error)
    throw new Error("Unable to accept the pet adopt request, please try again")
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string; adrID: string } },
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

    const post = await acceptAdoptionRequest(params.id, params.adrID)
    return NextResponse.json(
      { message: "Post created successfully", post },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
