import { getAllAdoptablePets } from "@/lib/actions/adopt"
import { getCurrentUser } from "@/lib/actions/user"
import { UserType } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.type === UserType.PetAdoptionCentre) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      )
    }

    const getAdoptablePets = await getAllAdoptablePets()
    return NextResponse.json({ data: getAdoptablePets }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
