"use client"

import { LostPetReport } from "@prisma/client"
import { useState } from "react"

const LostPetReportPage = ({
  lostPetReport,
}: {
  lostPetReport: LostPetReport | null
}) => {
  const [thisLostPetReport, setThisLostPetReport] = useState(lostPetReport)

  return <main>{thisLostPetReport ? thisLostPetReport.petName : "Empty"}</main>
}
export default LostPetReportPage
