"use client"

import { FoundPetReport, LostPetReport } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

import { TabsContent } from "../../ui/Tabs"

interface ProfileReportsTabInterface {
  reports: FoundPetReport[] | LostPetReport[] | null
}

function ProfileReportsTab({ reports }: ProfileReportsTabInterface) {
  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_200,h_200,c_thumb,g_face,r_max,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }

  const router = useRouter()

  const handleLostPetReportClick = (reportId: string) => {
    router.push(`/lostAndFound/losses/${reportId}`)
  }

  const handleFoundPetReportClick = (reportId: string) => {
    router.push(`/lostAndFound/founds/${reportId}`)
  }

  const handleReportClick = (report: LostPetReport | FoundPetReport) => {
    if ("lastSeenArea" in report) {
      handleLostPetReportClick(report.id)
    } else if ("foundArea" in report) {
      handleFoundPetReportClick(report.id)
    }
  }

  return (
    <TabsContent value="reports" className="w-full h-full pt-16">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {reports == null
          ? "No Reports Available"
          : reports.map((report) => (
              <div
                key={report.id}
                className={
                  report.isActive
                    ? "flex flex-col items-center mb-5 mr-12 cursor-pointer"
                    : "flex flex-col items-center mb-5 mr-12 cursor-pointer  bg-gray-500"
                }
                onClick={() => handleReportClick(report)}
              >
                <Image
                  className="object-cover w-20 h-20 rounded-md"
                  src={transformImage(report.imageUrl)}
                  width={80}
                  height={80}
                  alt="Bordered avatar"
                />
                <div
                  className={
                    report.isActive
                      ? "flex border p-4 rounded-xl bg-white h-full  cursor-pointer"
                      : "flex border p-4 rounded-xl bg-gray-500 h-full  cursor-pointer"
                  }
                >
                  {report.isActive ? "Missing Pet " : "Pet has been found"}
                </div>
                <p className="mb-[10px]">
                  {"foundArea" in report
                    ? "Found Pet Report"
                    : "Missing Pet Report"}
                </p>

                <p className="mb-[10px]">{report.petName}</p>
                <p className="mb-[10px]">{report.animalType}</p>
                <p className="mb-[10px]"> {report.animalBreed} </p>
              </div>
            ))}
      </div>
    </TabsContent>
  )
}

export default ProfileReportsTab
