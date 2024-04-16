import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const currentUser = await getCurrentUser()
  try {
    const userId = currentUser?.id
    const foundPetReports = await prisma.foundPetReport.findMany({
      where: {
        userId: userId,
      },
    })

    const lostPetReports = await prisma.lostPetReport.findMany({
      where: {
        userId: userId,
      },
    })

    const combinedReports = [...foundPetReports, ...lostPetReports]

    return NextResponse.json(combinedReports)
  } catch (error) {
    console.log("Update error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
