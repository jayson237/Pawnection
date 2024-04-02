import getCurrentUser from "@/actions/getCurrentUser"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()
  try {

    const data = await request.json()
    const reportId = data.reportId

    await prisma.lostPetReport.delete({
        where: { id: reportId },
    });
     
    return new NextResponse("Successfully deleted report", { status: 200 })
  } catch (error) {
    console.log("Creation error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
