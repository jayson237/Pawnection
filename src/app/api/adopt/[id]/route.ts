import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import {
  CreateAdoptRequestPayloadType,
  CreateAdoptRequestSchema,
} from "@/types/adopt"
import { AdoptRequestStatus } from "@prisma/client"
import { NextResponse } from "next/server"

export const POST = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      )
    }

    const payload: CreateAdoptRequestPayloadType =
      CreateAdoptRequestSchema.parse(await req.json())
    await prisma.adoptionRequest.create({
      data: {
        ...payload,
        adoptablePetId: params.id,
        request_status: AdoptRequestStatus.Pending,
        userId: currentUser.id,
      },
    })

    return NextResponse.json(
      {
        message: "Adopt request sent",
      },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
