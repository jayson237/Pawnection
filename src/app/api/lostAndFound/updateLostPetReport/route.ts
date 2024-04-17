import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const profileId = data.reportId

    const updatedReport = await prisma.lostPetReport.update({
      where: {
        id: profileId
      },
      data: {
        petName: data.petName,
        animalType: data.animalType,
        animalBreed: data.animalBreed,
        contactDetails: data.contactDetails,
        lastSeenArea: data.lastSeenArea,
        lastSeenDate: data.lastSeenDate,
        reportDescription: data.reportDescription,
        reportMessage: data.reportMessage
      },
    })

    return NextResponse.json(updatedReport)
  } catch (error) {
    console.log("Update error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
