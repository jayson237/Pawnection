"use client"

import { LostPetReport } from "@prisma/client"
import HeaderTitle
 from "../HeaderTitle"
 import { SafeUser } from "@/types" 
import { Button } from "../ui/Button"
import { useRouter } from "next/navigation"
import getCurrentUser from "@/actions/getCurrentUser"
import { useState, useEffect } from "react"
const LostPetReportPage = ({
  lostPetReport,
}: {
  lostPetReport: LostPetReport | null
}) => {
  const [thisLostPetReport, setThisLostPetReport] = useState(lostPetReport)
  const router = useRouter()

  const transformImage = (url:string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,r_max,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }


  const deleteReport = async () => {
    if (thisLostPetReport && confirm("Are you sure you want to delete this report?")) {
      try {
        const response = await fetch("/api/lostAndFound/deleteLostPetReport", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: thisLostPetReport.id }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete the report.");
        }
  
        alert("Report deleted successfully");
        setThisLostPetReport(null);
        router.push(`/lostAndFound`)
      } catch (error) {
        console.error("Error deleting report:", error);
        alert("Failed to delete the report.");
      }
    }
  };

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
            <Button onClick = {()=> deleteReport()}> Delete Report </Button>
            </div>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">

            <div className="flex border p-4 rounded-xl bg-white h-full  cursor-pointer">
              <p style={{ marginBottom: "10px" }}>Pet Name: {thisLostPetReport.petName}</p>
            </div>
                                                            
                <p style={{ marginBottom: "10px" }}>Animal Type: {thisLostPetReport.animalType}</p>
                <p style={{ marginBottom: "10px" }}>Animal Breed: {thisLostPetReport.animalBreed}</p>
                <p style={{ marginBottom: "10px" }}>Contact Details: {thisLostPetReport.contactDetails}</p>
                <p style={{ marginBottom: "10px" }}>Last Seen Area: {thisLostPetReport.lastSeenArea}</p>
                <p style={{ marginBottom: "10px" }}>Last Seen Date: {thisLostPetReport.lastSeenDate.toLocaleDateString()}</p>
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