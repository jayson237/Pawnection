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

  const unupdateStatus = async () => {
    if (
      thisFoundPetReport &&
      confirm("Are you sure you pet has not been returned to owner?")
    ) {
      try {
        const response = await fetch("/api/lostAndFound/unupdateFoundPetReportStatus", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: thisFoundPetReport.id }),
        })

        if (!response.ok) {
          throw new Error("Failed to update the report status.")
        }

        alert("Report status updated successfully")
        setReportActive(true)
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
    <div className="container mx-auto w-full h-full">
    <div className=" mt-5 flex items-center">
      <h1 className="text-4xl font-bold">Found Pet Detail</h1>
    </div>
    <div className="py-[20px]">
      <div className="bg-[#FFECE4] h-[250px] rounded-3xl px-28 py-6">
        <div className="w-full h-full flex justify-between">
          <div className="flex items-center space-x-10">
            <Image src={transformImage(thisFoundPetReport!.imageUrl)}
                    width={175}
                    height={175}                   
                    alt={`Lost pet named ${thisFoundPetReport!.petName}`} 
                    className="rounded-full" />

            <div className="space-y-2">
              <p className="font-bold text-xl">{thisFoundPetReport!.petName}</p>
              <p>{thisFoundPetReport!.animalBreed}</p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2 self-center">
            {thisFoundPetReport!.userId === currUser?.id && thisFoundPetReport!.isActive && (
              <Button className="w-full" onClick={() => updateReport()}>Edit Report</Button>
            )} 
            {thisFoundPetReport!.userId === currUser?.id && (
              <Button className="w-full" onClick={() => deleteReport()}>Delete Report</Button>
            )}
            {thisFoundPetReport!.userId === currUser?.id && thisFoundPetReport!.isActive && (
              <Button className="w-full" onClick={() => updateStatus()}>Pet has been returned</Button>
            )}
            {thisFoundPetReport!.userId === currUser?.id && !thisFoundPetReport!.isActive && (
              <Button className="w-full" onClick={() => unupdateStatus()}>Pet has not been returned</Button>
            )}            
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-center font-bold text-5xl">Details</h1>
        <div className="w-full bg-white shadow-lg rounded-lg p-4 mt-6 flex flex-row">
          <div className="w-1/2 space-y-8">
            <CardItem title="Pet Name" content={thisFoundPetReport!.petName} />
            <CardItem title="Sex" content={thisFoundPetReport!.petSex} />
            <CardItem title="Message from Owner" content={thisFoundPetReport!.reportMessage} />
            <CardItem title="Area Last Seen" content={thisFoundPetReport!.foundArea} />
            <CardItem title="Contact Detail" content={thisFoundPetReport!.contactDetails} />
          </div>
          <div className="w-1/2 space-y-8">
            <CardItem title="Status" content={thisFoundPetReport?.isActive ? "Found Pet " : "Pet has been returned"}/>
            <CardItem title="Species" content={thisFoundPetReport!.animalBreed} />
            <CardItem title="Description" content={thisFoundPetReport!.reportDescription} />
            <CardItem title="Last Seen Date" content={formattedFoundDate} />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
export default FoundPetReportPage



const CardItem = ({title, content}: {title: string, content: string}) => {
  return (
    <div>
      <h1 className="font-bold"> • {title}:</h1>
      <p className="ml-3">{content}</p>
    </div>
  )
}