import { FoundPetReport } from "@prisma/client"
import prisma from "@/lib/prismadb"

export default async function getAllFoundPetReports(): Promise<FoundPetReport[] | null> {
    try{ 
        const allFoundPetReports = await prisma?.foundPetReport.findMany()
        if (!allFoundPetReports?.length){
            return null
        }
        return [...allFoundPetReports]
    } catch (error) {
       return null
    }

}