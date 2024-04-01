"use client"

import { type FormEvent, useState } from "react"

import { Button } from "../ui/Button"
import { Textarea } from "../ui/TextArea"
import getSpecificLostPetReport from "@/actions/getSpecificLostPetReport"
import { LostPetReport } from "@prisma/client"

const LostPetReportPage = ({
  lostPetReport
} : {
  lostPetReport : LostPetReport | null
}) => {
  const [thisLostPetReport, setThisLostPetReport] = useState(lostPetReport)

  const transformImage = (url:string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,r_max,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px]">
      <div className="grid grid-cols-2">
        {thisLostPetReport ?      
          <div>
            <div   
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "flex-start", 
              gap: "50px" // Adjust the gap as needed
            }}>     
            <img src={transformImage(thisLostPetReport.imageUrl)} alt="Pet" style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}/>
            <h1 className="text-3xl font-semibold tracking-tight mb-4 flex">{thisLostPetReport.petName} </h1>
            </div>
                <p style={{ marginBottom: "10px" }}>Pet Name: {thisLostPetReport.petName}</p>
                <p style={{ marginBottom: "10px" }}>Animal Type: {thisLostPetReport.animalType}</p>
                <p style={{ marginBottom: "10px" }}>Animal Breed: {thisLostPetReport.animalBreed}</p>
                <p style={{ marginBottom: "10px" }}>Contact Details: {thisLostPetReport.contactDetails}</p>
                <p style={{ marginBottom: "10px" }}>Last Seen Area: {thisLostPetReport.lastSeenArea}</p>
                <p style={{ marginBottom: "10px" }}>Last Seen Date: {thisLostPetReport.lastSeenDate.toLocaleDateString()}</p>
                <p style={{ marginBottom: "10px" }}>Report Description: {thisLostPetReport.reportDescription}</p>
                <p style={{ marginBottom: "10px" }}>Report Message: {thisLostPetReport.reportMessage}</p>

                </div> 
            : "Report Not Available" }
          </div>
      </div>
      
    </div>
  ) 
}
export default LostPetReportPage



