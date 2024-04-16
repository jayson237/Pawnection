import { getSpecifiedUser } from "@/lib/actions/user";
import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"


export async function GET(request: Request) {

    try {
      const { searchParams } = new URL(request.url)
      const creatorId = searchParams.get("id") as string
      console.log("creatorId at api: ", creatorId)
      
      // const url = new URL(request.url)
      // const creatorId = url.searchParams.get("id");

      //   const data = await request.json()

        // const assuredId: string = creatorId!;

        const user = await prisma.user.findUnique({
            where : {
              id : creatorId
            }
          })
        
        if (!user) {
          return null
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
        return error;
    }
} 
  
