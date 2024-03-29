import { LostPetReport } from "@prisma/client"
import prisma from "@/lib/prismadb"
import { report } from "process"

export default async function getSpecificLostPetReport(reportId:string): Promise<LostPetReport | null> {
    try{ 
        const lostPetReport = await prisma.lostPetReport.findUnique({
            where: {
              id: reportId,
            },
          })
        return lostPetReport
    } catch (error) {
        console.log(error)
        return null
    }

}