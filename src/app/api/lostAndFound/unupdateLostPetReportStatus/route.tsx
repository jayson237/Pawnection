import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
//   const currentUser = await getCurrentUser()
  try {
    const data = await request.json()
    const reportId = data.reportId
    console.log(reportId)
    const updatedReport = await prisma.lostPetReport.update({
      where: {
        id: reportId
      },
      data: {
        isActive: true
      },
    })

    return NextResponse.json(updatedReport)
  } catch (error) {
    console.log("Update error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
