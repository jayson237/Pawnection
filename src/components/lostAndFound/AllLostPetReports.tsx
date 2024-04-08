"use client"

import { LostPetReport } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/Button"
import HeaderTitle from "../HeaderTitle"
import { Label } from "../ui/Label"
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
  const [isLostPetReportDialogOpen, setIsLostPetReportDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [reportActivity, setReportActivity] = useState<null | boolean>(null)


  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString =
      "w_500,h_500,c_thumb,g_face,r_max,f_auto,bo_5px_solid_black/"
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

        <HeaderTitle className="max-w-full">Lost Pet Reports</HeaderTitle>

        <div className="flex flex-row space-x-4 mt-10">

        <div className="flex items-center">
        <Button
            variant="outline"
            className=" bg-black text-white w-[180px] px-4 py-2 h-[40px]"
            onClick={() => setIsLostPetReportDialogOpen(true)}
          >            
          Report A Missing Pet
        </Button>

        <LostPetReportDialog
          isOpen={isLostPetReportDialogOpen}
          onClose={() => setIsLostPetReportDialogOpen(false)}
        />
        </div>
        <div className="flex items-center">
          <Select
              onValueChange={(val) => {
                setReportActivity(val === "Active" ? true : val === "Inactive" ? false : null)
              }}              
          >
            <SelectTrigger className="w-[180px] px-4 py-2 h-[40px]">
              <SelectValue placeholder="Filter Report Status" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="All">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center">
          <Select
            onValueChange={(val) => {
              const fetchData = async () => {
                fetchReports(val)
              }
              fetchData()
            }}            
          >
            <SelectTrigger className="w-[180px] px-4 py-2 h-[40px]">
              <SelectValue placeholder="Filter Animal Type" />
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

        <div className="flex items-center">
            <input
              type="text"
              placeholder="Search reports..."
              className="border px-4 py-2 w-[180px] h-[40px] rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
          {lostPetReports == null
            ? "No Lost Pet Reports "
            : lostPetReports.filter(report => {
              const matchesSearchTerm = report.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.animalType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.animalBreed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.contactDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.lastSeenArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.petSex.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.reportMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.reportDescription.toLowerCase().includes(searchTerm.toLowerCase())
        
              const matchesActivityStatus = reportActivity === null || report.isActive === reportActivity
        
              return matchesSearchTerm && matchesActivityStatus
            }).map((report, index) => (
              <div
              key={index}
              className={report.isActive ? "flex items-center border p-4 rounded-xl bg-white h-full cursor-pointer" 
              : "flex items-center p-4 rounded-xl bg-gray-300/40 h-full  cursor-pointer"} 
              onClick={() => handleLostPetReportClick(report.id)}
            >
              <Image
                src={transformImage(report.imageUrl)}
                alt="None"
                width={60}
                height={60}
                className="w-24 h-24 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Name: {report.petName}
                </h3>
                <p className="text-sm mb-2 text-mainAccent">
                  {report.animalType}
                </p>
                <p className="text-sm mb-2">Description: {report.reportDescription}</p>
                <p className="text-sm mb-3 text-gray-500">Status: {report.isActive ? " Missing Pet " : "Pet has been found"}</p>
              </div>
            </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default AllLostPetReports
