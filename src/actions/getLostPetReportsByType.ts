// Renamed and generalized function
import { LostPetReport } from "@prisma/client"
import prisma from "@/lib/prismadb"

export default async function getLostPetReportsByType(animalType: string): Promise<LostPetReport[] | null> {
    try { 
        const reports = await prisma.lostPetReport.findMany({
            where: {
              animalType: animalType
            },
        })
        return reports.length ? reports : null
    } catch (error) {
        console.error(error)
        return null
    }
}
