"use client"

import { FoundPetReport } from "@prisma/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/Button"
import { SafeUser } from "@/types"

const FoundPetReportPage = ({
  foundPetReport,
  currUser
}: {
  foundPetReport: FoundPetReport | null
  currUser: SafeUser | null
}) => {
  const [thisFoundPetReport, setThisFoundPetReport] = useState(foundPetReport)
  const router = useRouter()

  const deleteReport = async () => {
    if (thisFoundPetReport && confirm("Are you sure you want to delete this report?")) {
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

  const transformImage = (url:string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,r_max,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px]">
      <div className="grid grid-cols-2">
        {thisFoundPetReport ?      
          <div>
            <div   
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "flex-start", 
              gap: "50px" // Adjust the gap as needed
            }}>     
            <img src={transformImage(thisFoundPetReport.imageUrl)} alt="Pet" style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}/>
            <h1 className="text-3xl font-semibold tracking-tight mb-4 flex">{thisFoundPetReport.petName} </h1>
            {thisFoundPetReport.userId ===  currUser?.id  && (<Button onClick={() => deleteReport()}>Delete Report</Button>)}   
            </div>
                <p style={{ marginBottom: "10px" }}>Pet Name: {thisFoundPetReport.petName}</p>
                <p style={{ marginBottom: "10px" }}>Animal Type: {thisFoundPetReport.animalType}</p>
                <p style={{ marginBottom: "10px" }}>Animal Breed: {thisFoundPetReport.animalBreed}</p>
                <p style={{ marginBottom: "10px" }}>Contact Details: {thisFoundPetReport.contactDetails}</p>
                <p style={{ marginBottom: "10px" }}>Last Seen Area: {thisFoundPetReport.foundArea}</p>
                <p style={{ marginBottom: "10px" }}>Last Seen Date: {thisFoundPetReport.foundDate.toLocaleDateString()}</p>
                <p style={{ marginBottom: "10px" }}>Report Description: {thisFoundPetReport.reportDescription}</p>
                <p style={{ marginBottom: "10px" }}>Report Message: {thisFoundPetReport.reportMessage}</p>

                </div> 
            : "Report Not Available" }
          </div>
      </div>
      
    </div>
  ) 
}
export default FoundPetReportPage
