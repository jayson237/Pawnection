import { getAllLostPetReports } from "@/lib/actions/lostAndFound"
import { getCurrentUser } from "@/lib/actions/user"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      )
    }
    const getAllLostReports = await getAllLostPetReports()
    return NextResponse.json({ data: getAllLostReports }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
