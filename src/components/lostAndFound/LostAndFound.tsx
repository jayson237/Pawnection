"use client"

import { FoundPetReport, LostPetReport } from "@prisma/client"
import { Move, MoveRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "../ui/Button"
import FoundPetReportDialog from "./FoundPetReportDialog"
import LostPetReportDialog from "./LostPetReportDialog"
import Link from "next/link"


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

  const formattedDate = (date : Date) => {
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

    return formattedDate
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
      <h2 className="text-4xl font-bold tracking-tight mb-4 flex">
        Lost & Found Pets
      </h2>
      <p className="text-xl">Find your lost pets & help other pet owners!</p>

    </div>

    <div className="container mx-auto w-full h-full border-b border-t border-solid border-black pb-10">

      <div className="flex items-center justify-center mb-10 relative mt-5">
        <h2 className="font-bold text-3xl">Lost Pet</h2>
        <Link href='/lostAndFound/losses' className="flex space-x-1 items-center absolute top-0 right-0">
          <p>More</p>
          <MoveRight size={20} />
        </Link>
      </div>

      <div className="flex w-full">
      {lostPetReports == null || lostPetReports.length === 0
          ? "No Reports Available"
          : lostPetReports.slice(-5).map((report: LostPetReport) => (
              <div
                key={report.id}
                className="w-1/3 flex flex-col items-center cursor-pointer"
                onClick={() => handleLostPetReportClick(report.id)}
              >
                <Image
                  src={transformImage(report.imageUrl)}
                  width={100}
                  height={100}
                  alt="Pet"
                  className="h-auto mb-5 rounded-full"
                />
                <p className="mb-[10px] font-medium text-xl">{report.petName}</p>
                <p className="mb-[10px] text-gray-500">Lost on: {formattedDate(report.lastSeenDate)}</p>
                <p className="mb-[10px] text-xl font-medium">
                  Location: {report.lastSeenArea}
                </p>
              </div>
            ))}
      </div>
    </div>

    <div className="container mx-auto w-full h-full mt-5">
      <div className="flex items-center justify-center mb-10 relative">
        <h2 className="font-bold text-3xl">Found Pet</h2>
        <Link href='/lostAndFound/founds' className="flex space-x-1 items-center absolute top-0 right-0">
          <p>More</p>
          <MoveRight size={20} />
        </Link>
      </div>

      <div className="flex w-full">
      {foundPetReports == null || foundPetReports.length === 0
          ? "No Reports Available"
          : foundPetReports.slice(-5).map((report: FoundPetReport) => (
              <div
                key={report.id}
                className="w-1/3 flex flex-col items-center cursor-pointer"
                onClick={() => handleFoundPetReportClick(report.id)}
              >
                <Image
                  src={transformImage(report.imageUrl)}
                  width={100}
                  height={100}
                  alt="Pet"
                  className="h-auto mb-5 rounded-full"
                />
                <p className="mb-[10px] font-medium text-xl">{report.petName}</p>
                <p className="mb-[10px] text-gray-500">Lost on: {formattedDate(report.foundDate)}</p>
                <p className="mb-[10px] text-xl font-medium">
                  Location: {report.foundArea}
                </p>
              </div>
            ))}
      </div>
    </div>
  </main>
  )
}

export default LostAndFound
