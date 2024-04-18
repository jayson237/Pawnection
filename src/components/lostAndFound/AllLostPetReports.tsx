"use client"

import { LostPetReport } from "@prisma/client"
import { PawPrint } from "lucide-react"
import Image from "next/legacy/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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

  const navToFoundPetReports = () => {
    router.push("/lostAndFound/founds")
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

  useEffect(() => {
    fetchReports("All")
  }, [])

  return (
    <div className="container">
      <div className="py-[60px]">
        <div className="header-container flex justify-center items-center mb-12 space-x-10">
          <HeaderTitle className="header-title max-w-full cursor-pointer transition-all duration-300 ease-in-out">
            Lost Pet Reports
          </HeaderTitle>
          <HeaderTitle
            className="max-w-full cursor-pointer transition-all duration-300 text-3xl ease-in-out opacity-20 hover:opacity-100 hover:scale-110"
            onClick={navToFoundPetReports}
          >
            Found Pet Reports
          </HeaderTitle>
        </div>
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
            onReportCreated={() => fetchReports("All")}
          />
        </div>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 mt-6">
          {lostPetReports == null ? (
            <div className="col-span-full text-center">No reports found</div>
          ) : (
            lostPetReports
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
              .sort((a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0))
              .map((report, index) => (
                <div
                  key={index}
                  className={!report.isActive ? "opacity-50" : ""}
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
                    <div className="border rounded-xl px-1.5 py-1 flex items-center text-sm w-fit mt-auto">
                      <p className="text-smtext-gray-500">
                        {report.isActive ? "Lost Pet" : "Pet has been returned"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
          )}
          {lostPetReports !== null &&
            lostPetReports.filter((report) => {
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
            }).length === 0 && (
              <div className="col-span-full text-center">No reports found</div>
            )}
        </div>
      </div>
    </div>
  )
}

export default AllLostPetReports
