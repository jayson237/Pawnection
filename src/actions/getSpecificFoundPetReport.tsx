import { FoundPetReport } from "@prisma/client"
import prisma from "@/lib/prismadb"
import { report } from "process"

export default async function getSpecificFoundPetReport(reportId:string): Promise<FoundPetReport | null> {
    try{ 
        const foundPetReport = await prisma.foundPetReport.findUnique({
            where: {
              id: reportId,
            },
          })
        return foundPetReport
    } catch (error) {
        console.log("1")
        console.log(error)
        return null
    }

}