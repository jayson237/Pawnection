import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export async function GET(request: Request){
    try {
      const { searchParams } = new URL(request.url)
      const creatorId = searchParams.get("id") as string      

        const user = await prisma.user.findUnique({
            where : {
              id : creatorId
            }
          })
        
        if (!user) {
          return NextResponse.json(null)
        }

        const { hashedPassword, ...rest } = user
        
        return NextResponse.json({
          ...rest,
          emailVerified: rest.emailVerified?.toISOString(),
          createdAt: rest.createdAt.toISOString(),
          updatedAt: rest.updatedAt.toISOString(),
        })
 
    } catch (error) {
      console.log("error at api: ", error)
        return NextResponse.json(error)
    }
} 
  
