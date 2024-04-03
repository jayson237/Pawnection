"use client"

import { LostPetReport } from "@prisma/client"
import HeaderTitle
 from "../HeaderTitle"
 import { SafeUser } from "@/types" 
import { Button } from "../ui/Button"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/user"
import { useState, useEffect } from "react"
import { type } from "os"
const LostPetReportPage = ({
  lostPetReport,
  currUser
}: {
  lostPetReport: LostPetReport | null
  currUser : SafeUser | null
}) => {
  const [thisLostPetReport, setThisLostPetReport] = useState(lostPetReport)
  const [showButton, setShowButton] = useState(false)
  const [formattedLastSeenDate, setFormattedLastSeenDate] = useState("")

  const router = useRouter()

  const transformImage = (url:string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,r_max,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }


  const checkShowButtonOrNot = async() => {

    try{
      const userId = currUser?.id
      

      const reportId = thisLostPetReport?.userId
      
      console.log("userId: ", userId, typeof(userId))
      console.log("reportId: ", reportId, typeof(reportId))
      console.log(showButton)
      if ((userId?.trim()) == reportId?.trim()) {
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
    if (thisLostPetReport && confirm("Are you sure you want to delete this report?")) {
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
        setThisLostPetReport(null)
        router.push("/lostAndFound")
      } catch (error) {
        console.error("Error deleting report:", error)
        alert("Failed to delete the report.")
      }
    }
  }

  const updateReport= () => {
    router.push(`/lostAndFound/updateLostPetReportPage/${lostPetReport?.id}`)
  }  
  
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
    <div className="py-[60px]">
      <div className="grid grid-cols-6">

        {thisLostPetReport ?      
          <div>

            <img src={transformImage(thisLostPetReport.imageUrl)} alt="Pet" className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-primary"/>

            <div className="col-span-5">
            <div className="flex gap-8">
              <HeaderTitle className="text-left">{thisLostPetReport.petName}</HeaderTitle>
            </div>
            <div>
            {thisLostPetReport.userId ===  currUser?.id  && (<Button onClick={() => updateReport()}>Edit Report</Button>)}     
            {thisLostPetReport.userId ===  currUser?.id  && (<Button onClick={() => deleteReport()}>Delete Report</Button>)}   
            </div>
            </div>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">

            <div className="flex border p-4 rounded-xl bg-white h-full  cursor-pointer">
              <p style={{ marginBottom: "10px" }}>Pet Name: {thisLostPetReport.petName}</p>
            </div>
                                                            
                <p style={{ marginBottom: "10px" }}>Animal Type: {thisLostPetReport.animalType}</p>
                <p style={{ marginBottom: "10px" }}>Animal Breed: {thisLostPetReport.animalBreed}</p>
                <p style={{ marginBottom: "10px" }}>Contact Details: {thisLostPetReport.contactDetails}</p>
                <p style={{ marginBottom: "10px" }}>Last Seen Area: {thisLostPetReport.lastSeenArea}</p>
                <p style={{ marginBottom: "10px" }}>Last Seen Date: {formattedLastSeenDate}</p>
                <p style={{ marginBottom: "10px" }}>Report Description: {thisLostPetReport.reportDescription}</p>
                <p style={{ marginBottom: "10px" }}>Report Message: {thisLostPetReport.reportMessage}</p>
              </div>

              
                </div> 
            : "Report Not Available" }
          </div>
      </div>
      
    </div>
  ) 
}
export default LostPetReportPage