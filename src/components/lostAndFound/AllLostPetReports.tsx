"use client"

import { LostPetReport } from "@prisma/client"
import { PawPrint } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import LostPetReportDialog from "./LostPetReportDialog"

const AllLostPetReports = ({
  allLostPetReports,
}: {
  allLostPetReports: LostPetReport[] | null
}) => {
  const [lostPetReports, setLostPetReports] = useState(allLostPetReports)
  const [isLostPetReportDialogOpen, setIsLostPetReportDialogOpen] =
    useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }

  const router = useRouter()

  const handleLostPetReportClick = (reportId: string) => {
    router.push(`/lostAndFound/losses/${reportId}`)
  }

  const fetchReports = async (animalType: string) => {
    const url = "/api/lostAndFound/getLostPetReports?type=".concat(animalType)

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch reports")
    }

    const data = await response.json()
    setLostPetReports(data)
  }

  return (
    <div className="container mx-auto">
      <div className="py-[60px]">
        <HeaderTitle className="max-w-full mb-12">Lost Pet Reports</HeaderTitle>
        <div className="flex flex-row space-x-2">
          <Select
            onValueChange={(val) => {
              const fetchData = async () => {
                fetchReports(val)
              }
              fetchData()
            }}
            defaultValue="All"
          >
            <SelectTrigger className="w-[90px]">
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

          <Input
            type="text"
            placeholder="Search reports..."
            className="px-4 py-2 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            className="w-48"
            onClick={() => setIsLostPetReportDialogOpen(true)}
          >
            <PawPrint className="w-4 h-4 text-white mr-2" />
            Report A Missing Pet
          </Button>

          <LostPetReportDialog
            isOpen={isLostPetReportDialogOpen}
            onClose={() => setIsLostPetReportDialogOpen(false)}
          />
        </div>

        <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
          {lostPetReports == null
            ? "No Lost Pet Reports "
            : lostPetReports
                .filter((report) => {
                  return (
                    report.petName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.animalType
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.animalBreed
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.contactDetails
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.lastSeenArea
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.petSex
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.reportMessage
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.reportDescription
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                })
                .map((report, index) => (
                  <div
                    key={index}
                    onClick={() => handleLostPetReportClick(report.id)}
                  >
                    <div className="w-full h-48 relative">
                      <Image
                        src={transformImage(report.imageUrl)}
                        layout="fill"
                        objectFit="cover"
                        alt="Found Pet"
                        className="rounded-t-xl"
                      />
                    </div>
                    <div
                      className={
                        report.isActive
                          ? "flex flex-col p-4 rounded-b-xl bg-white cursor-pointer shadow-lg"
                          : "flex flex-col p-4 rounded-b-xl opacity-80 cursor-pointer shadow-lg"
                      }
                    >
                      <h3 className="text-xl font-semibold mb-1">
                        {report.petName}
                      </h3>
                      <p className="text-sm mb-2 text-mainAccent">
                        {report.animalType}
                      </p>
                      <p className="text-sm mb-2">{report.reportDescription}</p>
                      <div className="border rounded-xl px-1.5 py-1 flex items-center text-sm w-fit">
                        <p className="text-smtext-gray-500">
                          {report.isActive
                            ? "Found Pet"
                            : "Pet has been returned"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  )
}

export default AllLostPetReports
