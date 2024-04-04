"use client"

import { SafeUser } from "@/types"
import { FoundPetReport } from "@prisma/client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "../ui/Button"


const FoundPetReportPage = ({
  foundPetReport,
  currUser,
}: {
  foundPetReport: FoundPetReport | null
  currUser: SafeUser | null
}) => {
  const [thisFoundPetReport, setThisFoundPetReport] = useState(foundPetReport)
  const [formattedFoundDate, setFormattedFoundDate] = useState("")
  const [reportActive, setReportActive] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (thisFoundPetReport?.foundDate) {
      const date = new Date(thisFoundPetReport.foundDate)
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      setFormattedFoundDate(formattedDate)
    }
  }, [thisFoundPetReport?.foundDate])

  const deleteReport = async () => {
    if (
      thisFoundPetReport &&
      confirm("Are you sure you want to delete this report?")
    ) {
      try {
        const response = await fetch("/api/lostAndFound/deleteFoundPetReport", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: thisFoundPetReport.id }),
        })

        if (!response.ok) {
          throw new Error("Failed to delete the report.")
        }

        alert("Report deleted successfully")
        setThisFoundPetReport(null)
        router.push("/lostAndFound")
      } catch (error) {
        console.error("Error deleting report:", error)
        alert("Failed to delete the report.")
      }
    }
  }

  const updateStatus = async () => {
    if (
      thisFoundPetReport &&
      confirm("Are you sure you pet has been returned to owner?")
    ) {
      try {
        const response = await fetch("/api/lostAndFound/updateFoundPetReportStatus", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: thisFoundPetReport.id }),
        })

        if (!response.ok) {
          throw new Error("Failed to update the report status.")
        }

        alert("Report status updated successfully")
        setReportActive(false)
        router.push("/lostAndFound")
      } catch (error) {
        console.error("Error updating report status:", error)
        alert("Failed to update the report status.")
      }
    }
  }  

  const updateReport= () => {
    router.push(`/lostAndFound/updateFoundPetReportPage/${foundPetReport?.id}`)
  }

  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,r_max,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px]">
        <div className="grid grid-cols-2">
          {thisFoundPetReport ? (
            <div>
              <div className="flexx flex-start items-center gap-12">
                <Image
                  width={200}
                  height={200}
                  src={transformImage(thisFoundPetReport.imageUrl)}
                  alt="Pet"
                  className="w-full h-auto mb-5"
                />
                <h1 className="text-3xl font-semibold tracking-tight mb-4 flex">
                  {thisFoundPetReport.petName}{" "}
                </h1>
                {thisFoundPetReport.userId ===  currUser?.id  && thisFoundPetReport.isActive && (<Button onClick={() => updateReport()}>Edit Report</Button>)}   
                {thisFoundPetReport.userId === currUser?.id && (
                  <Button onClick={() => deleteReport()}>Delete Report</Button>
                )}
                {thisFoundPetReport.userId === currUser?.id && thisFoundPetReport.isActive && (
                  <Button onClick={() => updateStatus()}> Pet has been returned </Button>
                )}
                {thisFoundPetReport.isActive ? "Missing Pet " : "Pet has been returned"}
              </div>
              <div className="space-y-2">
                <p>Pet Name: {thisFoundPetReport.petName}</p>
                <p>Animal Type: {thisFoundPetReport.animalType}</p>
                <p>Animal Breed: {thisFoundPetReport.animalBreed}</p>
                <p>Contact Details: {thisFoundPetReport.contactDetails}</p>
                <p>Last Seen Area: {thisFoundPetReport.foundArea}</p>
                <p>
                  Last Seen Date:
                  {thisFoundPetReport.foundDate.toLocaleDateString()}
                </p>
                <p>
                  Report Description: {thisFoundPetReport.reportDescription}
                </p>
                <p>Report Message: {thisFoundPetReport.reportMessage}</p>
              </div>
            </div>
          ) : (
            "Report Not Available"
          )}
        </div>
      </div>
    </div>
  )
}
export default FoundPetReportPage
