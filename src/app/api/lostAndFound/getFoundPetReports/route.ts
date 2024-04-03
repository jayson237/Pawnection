import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

    try{
        const data = await request.json()
        const animalType = data.animalType

        const reports = animalType === "All" 
        ? await prisma.foundPetReport.findMany()
        : await prisma.foundPetReport.findMany({ where: { animalType: animalType } })
        
        if (!reports.length) {
            return NextResponse.json(null)
        }

        return NextResponse.json(reports)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
      }

}
