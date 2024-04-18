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
    const transformationString = "w_500,h_500,c_thumb,g_face,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }

  const router = useRouter()

  const handleLostPetReportClick = (reportId: string) => {
    router.push(`/lostAndFound/losses/${reportId}`)
  }

  const handleFoundPetReportClick = (reportId: string) => {
    router.push(`/lostAndFound/founds/${reportId}`)
  }

  return (
    <TabsContent value="reports" className="w-full h-full pt-16">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {reports == null || reports.length === 0
          ? "No Reports Available"
          : reports.map((report, index) => (
              <div
                key={index}
                className={`cursor-pointer ${!report.isActive ? "opacity-50" : ""}`}
                onClick={() => handleLostPetReportClick(report.id)}
              >
                <div className="w-full h-48 relative">
                  <Image
                    src={transformImage(report.imageUrl)}
                    layout="fill"
                    objectFit="cover"
                    alt="Lost Pet"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="flex flex-col p-4 rounded-b-xl bg-white cursor-pointer shadow-lg min-h-[170px]">
                  <h3 className="text-xl font-semibold mb-1">
                    {report.petName}
                  </h3>
                  <p className="text-sm mb-2 text-mainAccent">
                    {report.animalType}
                  </p>
                  <p className="text-sm line-clamp-2">
                    {report.reportDescription}
                  </p>
                  <div className="mt-auto">
                    <div className="border rounded-xl px-1.5 py-1 flex items-center text-sm w-fit">
                      {report.isActive ? (
                        <p className="text-red-500 font-semibold">Lost Pet</p>
                      ) : (
                        <p className="text-mainAccent font-semibold">
                          Pet has been found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </TabsContent>
  )
}

export default ProfileReportsTab
