"use client"

import { FoundPetReport, LostPetReport } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

import { Badge } from "../../ui/Badge"
import { Label } from "../../ui/Label"
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
        {reports == null || reports.length === 0
          ? "No Reports Available"
          : reports.map((report) => (
              <div
                onClick={() => handleReportClick(report)}
                key={report.id}
                className="bg-white"
              >
                <Image
                  width={200}
                  height={200}
                  src={report.imageUrl}
                  alt={report.petName}
                  className="w-full h-[200px] object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{report.petName}</h2>
                  <p className="text-gray-500">{report.animalBreed}</p>
                  <p className="text-gray-500">Type: {report.animalType}</p>
                  <div className="space-x-2">
                    {"foundArea" in report ? (
                      <Label className="text-red-500">Found Pet Report</Label>
                    ) : (
                      <Label>Missing Pet Report</Label>
                    )}
                    {report.isActive ? (
                      <Badge>Missing Pet</Badge>
                    ) : (
                      <Badge>Pet has been found</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </TabsContent>
  )
}

export default ProfileReportsTab
