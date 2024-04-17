
"use client"

import { FoundPetReport, LostPetReport } from "@prisma/client"
import { MoveRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import Link from "next/link"
import { Card } from "../ui/Card"

const LostAndFound = ({
 allLostPetReports,
 allFoundPetReports,
}: {
 allLostPetReports: LostPetReport[] | null
 allFoundPetReports: FoundPetReport[] | null
}) => {
 const [lostPetReports, setLostPetReports] = useState(allLostPetReports)
 const [foundPetReports, setFoundPetReports] = useState(allFoundPetReports)


 const transformImage = (url: string) => {
   const parts = url.split("/upload/")
   const transformationString = "w_400,h_400,c_thumb,g_face,f_auto/"
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

 return (
  <main className="flex min-h-screen flex-col items-center divide-gray-100 w-full h-full">
    <div className="flex flex-col pb-4 w-full h-1/4 px-4 items-center mt-10">
      <h2 className="text-4xl font-bold tracking-tight mb-4">
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

      <div className="flex w-full gap-4">
        {lostPetReports == null || lostPetReports.length === 0
          ? "No Reports Available"
          : lostPetReports.slice(-5).map((report: LostPetReport) => (
            <Card
              key={report.id}
              className="flex flex-col items-center cursor-pointer py-6 shadow-lg w-1/3"
              onClick={() => handleLostPetReportClick(report.id)}
            >
              <div className="w-48 h-48 relative"> 
                <Image
                  src={transformImage(report.imageUrl)}
                  layout="fill"
                  objectFit="cover"
                  alt="Pet"
                  className="rounded-lg"
                />
              </div>
              <p className="mt-4 mb-2 font-medium text-xl">{report.petName}</p>
              <p className="text-gray-500">Lost on: {formattedDate(report.lastSeenDate)}</p>
              <p className="text-xl font-medium">
                Location: {report.lastSeenArea}
              </p>
            </Card>
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

<div className="flex w-full gap-4">
        {foundPetReports == null || foundPetReports.length === 0
          ? "No Reports Available"
          : foundPetReports.slice(-5).map((report: FoundPetReport) => (
            <Card
              key={report.id}
              className="flex flex-col items-center cursor-pointer py-6 shadow-lg w-1/3"
              onClick={() => handleFoundPetReportClick(report.id)}
            >
              <div className="w-48 h-48 relative"> 
                <Image
                  src={transformImage(report.imageUrl)}
                  layout="fill"
                  objectFit="cover"
                  alt="Pet"
                  className="rounded-lg"
                />
              </div>
              <p className="mt-4 mb-2 font-medium text-xl">{report.petName}</p>
              <p className="text-gray-500">Found on: {formattedDate(report.foundDate)}</p>
              <p className="text-xl font-medium">
                Location: {report.foundArea}
              </p>
            </Card>
          ))}
      </div>
    </div>
  </main>
)

}


export default LostAndFound
