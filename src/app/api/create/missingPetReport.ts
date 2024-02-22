import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export default async function POST(request: Request) {
  try {
    const data = await request.json()
    const body = data.body 

    const missingReport = await prisma.lostPetReport.create(body)

    return NextResponse.json(missingReport)
  } catch (error) {
    console.log("Creation error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }

}

