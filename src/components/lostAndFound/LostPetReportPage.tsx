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

  return (
    <main>
      {thisLostPetReport ? thisLostPetReport.petName : "Empty" }
      
    </main>
  ) 
}
export default LostPetReportPage



