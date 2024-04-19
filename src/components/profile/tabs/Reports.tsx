"use client"

import Loading from "@/components/Loading"
import { FoundPetReport, LostPetReport } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

import { TabsContent } from "../../ui/Tabs"

interface ProfileReportsTabInterface {
  reports:
    | (FoundPetReport & { type: string })[]
    | (LostPetReport & { type: string })[]
    | null
}

function ProfileReportsTab({ reports }: ProfileReportsTabInterface) {
  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }

  const router = useRouter()

  const handleReportClick = (reportId: string, type: string) => {
    const basePath =
      type === "FoundPetReport"
        ? "/lostAndFound/founds/"
        : "/lostAndFound/losses/"
    router.push(`${basePath}${reportId}`)
  }

  return (
    <TabsContent value="reports" className="w-full h-full pt-16">

      {reports ? (
        reports.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {reports.map((report, index) => (
              <div
                key={index}
                className={`cursor-pointer ${!report.isActive ? "opacity-50" : ""}`}
                onClick={() => handleReportClick(report.id, report.type)}
              >
                <div className="w-full h-48 relative">
                  <Image
                    src={transformImage(report.imageUrl)}
                    layout="fill"
                    objectFit="cover"
                    alt={`${report.type === "LostPetReport" ? "Lost" : "Found"} Pet`}
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
                      <p
                        className={`font-semibold ${report.isActive ? "text-green-500" : "text-mainAccent"}`}
                      >
                        {report.type === "LostPetReport"
                          ? "Lost Pet"
                          : "Found Pet"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full flex justify-center items-center text-center">
            <p>No result found</p>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      )}
    </TabsContent>
  )
}

export default ProfileReportsTab
