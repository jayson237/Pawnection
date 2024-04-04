import prisma from "@/lib/prismadb"
import { FoundPetReport, LostPetReport } from "@prisma/client"

export async function getAllFoundPetReports(): Promise<
  FoundPetReport[] | null
> {
  try {
    const allFoundPetReports = await prisma?.foundPetReport.findMany()
    if (!allFoundPetReports?.length) {
      return null
    }
    return [...allFoundPetReports]
  } catch (error) {
    return null
  }
}

export async function getAllLostPetReports(): Promise<LostPetReport[] | null> {
  try {
    const allLostPetReports = await prisma?.lostPetReport.findMany()
    if (!allLostPetReports?.length) {
      return null
    }
    return [...allLostPetReports]
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getLostPetReportsByType(
  animalType: string,
): Promise<LostPetReport[] | null> {
  try {
    const reports = await prisma.lostPetReport.findMany({
      where: {
        animalType: animalType,
      },
    })
    return reports.length ? reports : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getSpecificFoundPetReport(
  reportId: string,
): Promise<FoundPetReport | null> {
  try {
    const foundPetReport = await prisma.foundPetReport.findUnique({
      where: {
        id: reportId,
      },
    })
    return foundPetReport
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getSpecificLostPetReport(
  reportId: string,
): Promise<LostPetReport | null> {
  try {
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
