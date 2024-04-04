import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const animalType = searchParams.get("type") as string

    try{

        const reports = animalType === "All" 
        ? await prisma.lostPetReport.findMany()
        : await prisma.lostPetReport.findMany({ where: { animalType: animalType } })
        
        if (!reports.length) {
            return NextResponse.json(null)
        }
        return NextResponse.json(reports)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
      }
}
  
  