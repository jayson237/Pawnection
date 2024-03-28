import { LostPetReport } from "@prisma/client"
import prisma from "@/lib/prismadb"

export default async function getAllLostPetReports(): Promise<LostPetReport[] | null> {
    try{ 
        const allLostPetReports = await prisma?.lostPetReport.findMany()
        if (!allLostPetReports?.length){
            return null
        }
        return [...allLostPetReports]
    } catch (error) {
        console.log(error)
        return null
    }

}