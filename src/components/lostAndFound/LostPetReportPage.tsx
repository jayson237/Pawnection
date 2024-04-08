"use client"

import { SafeUser } from "@/types"
import { LostPetReport } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"

const LostPetReportPage = ({
  lostPetReport,
  currUser,
}: {
  lostPetReport: LostPetReport | null
  currUser: SafeUser | null
}) => {
  const [thisLostPetReport, setThisLostPetReport] = useState(lostPetReport)
  const [showButton, setShowButton] = useState(false)
  const [formattedLastSeenDate, setFormattedLastSeenDate] = useState("")
  const [reportActive, setReportActive] = useState(true)

  const router = useRouter()

  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,r_max,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }

  const checkShowButtonOrNot = async () => {
    try {
      const userId = currUser?.id
      const reportId = thisLostPetReport?.userId
      if (userId?.trim() == reportId?.trim()) {
        setShowButton(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (thisLostPetReport?.lastSeenDate) {
      const date = new Date(thisLostPetReport.lastSeenDate)
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      setFormattedLastSeenDate(formattedDate)
    }
  }, [thisLostPetReport?.lastSeenDate])


  const deleteReport = async () => {
    if (
      thisLostPetReport &&
      confirm("Are you sure you want to delete this report?")
    ) {
      try {
        const response = await fetch("/api/lostAndFound/deleteLostPetReport", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: thisLostPetReport.id }),
        })

        if (!response.ok) {
          throw new Error("Failed to delete the report.")
        }

        alert("Report deleted successfully")
        router.push("/lostAndFound")
        // setThisLostPetReport(null)
      } catch (error) {
        console.error("Error deleting report:", error)
        alert("Failed to delete the report.")
      }
    }
  }

  const updateStatus = async () => {
    if (
      thisLostPetReport &&
      confirm("Are you sure you have found your pet?")
    ) {
      try {
        const response = await fetch("/api/lostAndFound/updateLostPetReportStatus", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: thisLostPetReport.id }),
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
      thisLostPetReport &&
      confirm("Are you sure you have not found your pet?")
    ) {
      try {
        const response = await fetch("/api/lostAndFound/unupdateLostPetReportStatus", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: thisLostPetReport.id }),
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
    router.push(`/lostAndFound/updateLostPetReportPage/${lostPetReport?.id}`)
  }  
  
  return (
    <div className="container mx-auto w-full h-full">
    <div className=" mt-5 flex items-center">
      <h1 className="text-4xl font-bold">Lost Pet Detail</h1>
    </div>
    <div className="py-[20px]">
      <div className="bg-[#FFECE4] h-[250px] rounded-3xl px-28 py-6">
        <div className="w-full h-full flex justify-between">
          <div className="flex items-center space-x-10">
            <Image src={transformImage(thisLostPetReport!.imageUrl)}
                  width={175}
                  height={175} 
                  alt={`Lost pet named ${thisLostPetReport!.petName}`} 
                  className="rounded-full" />

            <div className="space-y-2">
              <p className="font-bold text-xl">{thisLostPetReport!.petName}</p>
              <p>{thisLostPetReport!.animalBreed}</p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2 self-center">
            {thisLostPetReport!.userId === currUser?.id && thisLostPetReport!.isActive && (
              <Button className="w-full" onClick={() => updateReport()}>Edit Report</Button>
            )} 
            {thisLostPetReport!.userId === currUser?.id && (
              <Button className="w-full" onClick={() => deleteReport()}>Delete Report</Button>
            )}
            {thisLostPetReport!.userId === currUser?.id && thisLostPetReport!.isActive && (
              <Button className="w-full" onClick={() => updateStatus()}>Pet has been found</Button>
            )}
            {thisLostPetReport!.userId === currUser?.id && !thisLostPetReport!.isActive && (
              <Button className="w-full" onClick={() => unupdateStatus()}>Pet has not been found</Button>
            )}            
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-center font-bold text-5xl">Details</h1>
        <div className="w-full bg-white shadow-lg rounded-lg p-4 mt-6 flex flex-row">
          <div className="w-1/2 space-y-8">
            <CardItem title="Pet Name" content={thisLostPetReport!.petName} />
            <CardItem title="Sex" content={thisLostPetReport!.petSex} />
            <CardItem title="Message from Owner" content={thisLostPetReport!.reportMessage} />
            <CardItem title="Area Last Seen" content={thisLostPetReport!.lastSeenArea} />
            <CardItem title="Contact Detail" content={thisLostPetReport!.contactDetails} />
          </div>
          <div className="w-1/2 space-y-8">
            <CardItem title="Status" content={thisLostPetReport!.isActive ? "Missing" : "Pet has been found"}/>
            <CardItem title="Species" content={thisLostPetReport!.animalBreed} />
            <CardItem title="Description" content={thisLostPetReport!.reportDescription} />
            <CardItem title="Last Seen Date" content={formattedLastSeenDate} />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
export default LostPetReportPage


const CardItem = ({title, content}: {title: string, content: string}) => {
  return (
    <div>
      <h1 className="font-bold"> • {title}:</h1>
      <p className="ml-3">{content}</p>
    </div>
  )
}
