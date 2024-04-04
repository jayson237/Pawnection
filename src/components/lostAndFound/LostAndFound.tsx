"use client"

import { FoundPetReport, LostPetReport } from "@prisma/client"
import { Move, MoveRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "../ui/Button"
import FoundPetReportDialog from "./FoundPetReportDialog"
import LostPetReportDialog from "./LostPetReportDialog"

const LostAndFound = ({
  allLostPetReports,
  allFoundPetReports,
}: {
  allLostPetReports: LostPetReport[] | null
  allFoundPetReports: FoundPetReport[] | null
}) => {
  const [isLostPetReportDialogOpen, setIsLostPetReportDialogOpen] = useState(false)
  const [isFoundPetReportDialogOpen, setIsFoundPetReportDialogOpen] = useState(false)
  const [lostPetReports, setLostPetReports] = useState(allLostPetReports)
  const [foundPetReports, setFoundPetReports] = useState(allFoundPetReports)

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

  const handleViewMoreLostPetReports = () => {
    router.push("/lostAndFound/losses")
  }

  const handleViewMoreFoundPetReports = () => {
    router.push("/lostAndFound/founds")
  }

  return (
    <main className="flex min-h-screen flex-col items-center divide-gray-100 w-full h-full">
      <div className="flex flex-col pb-4 w-full h-1/4 px-4 items-center mt-10">
        <h2 className="text-3xl font-semibold tracking-tight mb-4 flex">
          Lost & Found Pets
        </h2>

      </div>

      <div className="flex border-t-2 border-black my-4 flex-col items-center border-b-5 pb-4 w-full h-full">
        <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
          Lost Pets
        </h2>

        <div className="flex mt-2 mb-2 items-center ">
          {lostPetReports == null
            ? "No Reports Available"
            : lostPetReports.slice(-5).map((report: LostPetReport) => (
                <div
                  key={report.id}
                  className={report.isActive ? "flex border p-4 rounded-xl bg-white h-full  cursor-pointer" 
                  : "flex border p-4 rounded-xl bg-gray-500 h-full  cursor-pointer"} 
                  onClick={() => handleLostPetReportClick(report.id)}
                >
                  <Image
                    src={transformImage(report.imageUrl)}
                    width={200}
                    height={200}
                    alt="Pet"
                    className="max-w-full h-auto mb-5 rounded-full"
                  />
                  <div className={report.isActive ? "flex border p-4 rounded-xl bg-white h-full  cursor-pointer" 
                  : "flex border p-4 rounded-xl bg-gray-500 h-full  cursor-pointer"} >
                    {report.isActive ? "Missing Pet " : "Pet has been found"}
                    </div>                  
                  <p className="mb-[10px]">Pet Name: {report.petName}</p>
                  <p className="mb-[10px]">Animal Type: {report.animalType}</p>
                  <p className="mb-[10px]">
                    Animal Breed: {report.animalBreed}
                  </p>
                </div>
              ))}
          <Button
            type="button"
            className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3"
            onClick={() => handleViewMoreLostPetReports()}
          >
            <div className="flex flex-row items-center">
              <span className="mr-2">More</span>
              <MoveRight className="w-4" />
            </div>
          </Button>
        </div>
      </div>

      <div className="flex border-t-2 border-black my-4 flex-col items-center border-b-5 pb-4 w-full h-full">
        <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
          Found Pets
        </h2>
        <div className="flex mt-2 mb-2 items-center">
          {foundPetReports == null
            ? "No Reports Available"
            : foundPetReports.slice(-5).map((report: FoundPetReport) => (
                <div
                  key={report.id} 
                  className={report.isActive ? "flex border p-4 rounded-xl bg-white h-full  cursor-pointer" 
                  : "flex border p-4 rounded-xl bg-gray-500 h-full  cursor-pointer"} 
                  onClick={() => handleFoundPetReportClick(report.id)}
                >
                  <Image
                    src={transformImage(report.imageUrl)}
                    width={200}
                    height={200}
                    alt="Pet"
                    className="max-w-full h-auto mb-5 rounded-full"
                  />
                  <div className={report.isActive ? "flex border p-4 rounded-xl bg-white h-full  cursor-pointer" 
                  : "flex border p-4 rounded-xl bg-gray-500 h-full  cursor-pointer"} >
                    {report.isActive ? "Missing Pet " : "Pet has been returned"}
                  </div>
                  
                  <p className="mb-[10px]">Pet Name: {report.petName}</p>
                  <p className="mb-[10px]">Animal Type: {report.animalType}</p>
                  <p className="mb-[10px]">
                    Animal Breed: {report.animalBreed}
                  </p>
                </div>
              ))}
          <Button
            type="button"
            className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3"
            onClick={() => handleViewMoreFoundPetReports()}
          >
            <div className="flex flex-row items-center">
              <span className="mr-2">More</span>
              <MoveRight className="w-4" />
            </div>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default LostAndFound
