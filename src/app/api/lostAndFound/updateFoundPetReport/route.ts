import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const profileId = data.reportId

    console.log(data.foundDate)
    const updatedReport = await prisma.foundPetReport.update({
      where: {
        id: profileId
      },
      data: {
        petName: data.petName,
        animalType: data.animalType,
        animalBreed: data.animalBreed,
        contactDetails: data.contactDetails,
        foundArea: data.foundArea,
        foundDate: data.foundDate,
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
