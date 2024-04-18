import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id") as string

    try{

        const report = await prisma.lostPetReport.findUnique( {
            where: {
                id : id
            }
        })

        return NextResponse.json(report)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
      }
}
  
  