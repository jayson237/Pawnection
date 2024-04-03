import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(request: Request) {

    try{
        const animalType = await request.json()

        const reports = animalType === "All" 
        ? await prisma.lostPetReport.findMany()
        : await prisma.lostPetReport.findMany({ where: { animalType: animalType } })
        
        return NextResponse.json(reports)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
      }

}
