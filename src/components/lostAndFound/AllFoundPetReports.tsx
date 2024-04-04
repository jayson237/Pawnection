"use client"

import { FoundPetReport } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import HeaderTitle from "../HeaderTitle"
import { Label } from "../ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"

const AllFoundPetReports = ({
  allFoundPetReports,
}: {
  allFoundPetReports: FoundPetReport[] | null
}) => {
  const [foundPetReports, setFoundPetReports] = useState(allFoundPetReports)

  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString =
      "w_500,h_500,c_thumb,g_face,r_max,f_auto,bo_5px_solid_black/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }

  const router = useRouter()

  const handleFoundPetReportClick = (reportId: string) => {
    router.push(`/lostAndFound/founds/${reportId}`)
  }

  const fetchReports = async (animalType: string) => {
    const url = `/api/lostAndFound/getFoundPetReports?type=${animalType}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch reports")
    }

    const data = await response.json()
    setFoundPetReports(data)
  }

  return (
    <div className="space-y-6 flex flex-col items-center justify-center w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[60px]">
        <HeaderTitle className="max-w-full">Found Pet Reports</HeaderTitle>

        <div className="mb-5 mt-5">
          <Label>Pet Type</Label>
          <Select
            onValueChange={(val) => {
              const fetchData = async () => {
                fetchReports(val)
              }
              fetchData()
            }}
            defaultValue="All"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Animal Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All </SelectItem>
              <SelectItem value="Dog">Dog</SelectItem>
              <SelectItem value="Cat">Cat</SelectItem>
              <SelectItem value="Bird">Bird</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
          {foundPetReports == null
            ? "No Found Pet Reports"
            : foundPetReports.map((report, index) => (
                <div
                  key={index}
                  className="flex border p-4 rounded-xl bg-white h-full  cursor-pointer"
                  onClick={() => handleFoundPetReportClick(report.id)}
                >
                  <Image
                    src={transformImage(report.imageUrl)}
                    alt="None"
                    width={60}
                    height={60}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {report.petName}
                    </h3>
                    <p className="text-sm mb-2 text-mainAccent">
                      {report.animalType}
                    </p>
                    <p className="text-sm mb-3">{report.reportDescription}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default AllFoundPetReports
