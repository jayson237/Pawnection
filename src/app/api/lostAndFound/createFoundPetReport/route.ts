import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { ChevronDownCircle } from "lucide-react"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()
  try {
    const data = await request.json()

    const missingReport = await prisma.foundPetReport.create({
      data: {
        user: {
          connect: {
            id: currentUser?.id,
          },
        },
        animalType: data.animalType,
        animalBreed: data.breed,
        petName: data.name,
        petSex: data.sex,
        reportMessage: data.message,
        reportDescription: data.description,
        foundArea: data.foundArea,
        foundDate: data.foundDate,
        contactDetails: data.contactDetails,
        imageUrl : data.petImage
      },
    })

    return NextResponse.json(missingReport)
  } catch (error) {
    console.log("Creation error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
