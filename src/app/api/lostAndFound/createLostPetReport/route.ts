import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()
  try {
    const data = await request.json()

    const missingReport = await prisma.lostPetReport.create({
      data: {
        user: {
          connect: {
            id: currentUser?.id,
          },
        },
        petName: data.name,
        petSex: data.sex,
        reportMessage: data.message,
        reportDescription: data.description,
        lastSeenArea: data.lastSeenArea,
        lastSeenDate: data.lastSeenDate,
        contactDetails: data.contactDetails,
      },
    })

    return NextResponse.json(missingReport)
  } catch (error) {
    console.log("Creation error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
