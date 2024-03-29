"use client"

import { useState, useEffect } from "react"

import { Button } from "../ui/Button"

import { Dialog } from "../ui/Dialog"

import { useRouter } from "next/navigation"
import Link from "next/link"


import LostPetReportDialog from "./LostPetReportDialog"

import FoundPetReportDialog from "./FoundPetReportDialog"
import { FoundPetReport, LostPetReport } from "@prisma/client"


const LostAndFound = ({
  allLostPetReports,
  allFoundPetReports
} : {
  allLostPetReports : LostPetReport[] | null
  allFoundPetReports : FoundPetReport[] | null
}) => {
  const [allSelected, setAllSeleceted] = useState(false)
  const [dogsSelected, setDogsSeleceted] = useState(false)
  const [catsSelected, setCatsSeleceted] = useState(false)
  const [birdsSelected, setBirdsSeleceted] = useState(false)
  const [othersSelected, setOthersSeleceted] = useState(false)
  const [isLostPetReportDialogOpen, setIsLostPetReportDialogOpen] = useState(false)
  const [isFoundPetReportDialogOpen, setIsFoundPetReportDialogOpen] = useState(false)
  const [lostPetReports, setLostPetReports] = useState(allLostPetReports)
  const [foundPetReports, setFoundPetReports] = useState(allFoundPetReports)


  const handleOpenLostPetReportDialog = () => {
    setIsLostPetReportDialogOpen(true)
  }

  const handleCloseLostPetReportDialog = () => {
    setIsLostPetReportDialogOpen(false)
  }

  const handleOpenFoundLostPetReportDialog = () => {
    setIsFoundPetReportDialogOpen(true)
  }

  const handleCloseFoundLostPetReportDialog = () => {
    setIsFoundPetReportDialogOpen(false)
  }

  const transformImage = (url:string) => {
    const parts = url.split('/upload/')
    const transformationString = 'w_200,h_200,c_thumb,g_face,r_max,f_auto/'
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }
  

  const router = useRouter()

  const handleLostPetReportClick = (reportId : string) => {
    router.push(`/lostAndFound/lostPetReportPage/${reportId}`)
    // <Link href={`/lostPetReportPage/${reportId}`}/>
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center divide-gray-100 w-full h-full">

      <div className="flex flex-col pb-4 w-full h-1/4 px-4 items-center mt-10">

        <h2 className="text-3xl font-semibold tracking-tight mb-4 flex">Lost & Found Pets</h2>

        <div className="flex mt-2 mb-2 ">
          <Button onClick = {() => {
            setAllSeleceted(true) 
            setDogsSeleceted(false)
            setCatsSeleceted(false)
            setBirdsSeleceted(false)
            setOthersSeleceted(false)}
          }
            variant="outline" 
            className = {allSelected ? "mr-8 w-40 bg-white text-black": "mr-8 w-40 bg-gray-300" }>
               All 
          </Button>     

          <Button onClick = {() => {
            setDogsSeleceted(true)
            setAllSeleceted(false)
            setCatsSeleceted(false)
            setBirdsSeleceted(false)
            setOthersSeleceted(false)}
          }
            variant="outline" 
            className = {dogsSelected ? "mr-8 w-40 bg-white text-black": "mr-8 w-40 bg-gray-300" }>
               Dogs 
          </Button>     

          <Button onClick = {() => {
            setCatsSeleceted(true)
            setDogsSeleceted(false)
            setAllSeleceted(false)
            setBirdsSeleceted(false)
            setOthersSeleceted(false)}} 
            variant="outline" 
            className = {catsSelected ? "mr-8 w-40 bg-white text-black": "mr-8 w-40 bg-gray-300" }>
               Cats 
          </Button>   

          <Button onClick = {() => {
            setBirdsSeleceted(true)
            setDogsSeleceted(false)
            setCatsSeleceted(false)
            setAllSeleceted(false)
            setOthersSeleceted(false)}}
            variant="outline" 
            className = {birdsSelected ? "mr-8 w-40 bg-white text-black": "mr-8 w-40 bg-gray-300" }>
               Birds 
          </Button>     

          <Button onClick = {() => {
            setOthersSeleceted(true)
            setDogsSeleceted(false)
            setCatsSeleceted(false)
            setBirdsSeleceted(false)
            setAllSeleceted(false)}}
            variant="outline" 
            className = {othersSelected ? "mr-8 w-40 bg-white text-black": "mr-8 w-40 bg-gray-300" }>
               Others 
          </Button>     
        </div>

        {/* <Button variant="outline" className="mr-8 w-60 mb-5 bg-black text-white" onClick={() => setIsLostPetReportDialogOpen(true)}>
            Report A Missing Pet
        </Button>

      <LostPetReportDialog isOpen={isLostPetReportDialogOpen} 
            onClose={() => setIsLostPetReportDialogOpen(false)} /> */}
    
        <div className = "flex mt-4">
        <Button variant="outline" className="mr-8 w-60 mb-5 bg-black text-white" onClick={() => setIsLostPetReportDialogOpen(true)}>
            Report A Missing Pet
        </Button>

      <LostPetReportDialog isOpen={isLostPetReportDialogOpen} 
            onClose={() => setIsLostPetReportDialogOpen(false)} />       
             {/* <Button className="mr-8 w-60 mb-5 bg-black text-white"> Found A Pet</Button> */}

        <Button variant="outline" className="mr-8 w-60 mb-5 bg-black text-white" onClick={() => setIsFoundPetReportDialogOpen(true)}>
            Report A Found Pet
        </Button>

      <FoundPetReportDialog isOpen={isFoundPetReportDialogOpen} 
            onClose={() => setIsFoundPetReportDialogOpen(false)} />       
        </div>

        {/* <Dialog open={isLostPetReportDialogOpen}>
        <div>Dialog Content</div>
        <Button onClick={handleCloseLostPetReportDialog}>Close</Button>
      </Dialog> */}


      </div>

      <div className="flex border-t-2 border-black flex-col pb-4 w-full h-full px-4 items-center">

        <h2 className="text-3xl font-semibold tracking-tight mb-4 flex">Lost Pets</h2>

        <div className="flex mt-2 mb-2 ">

        {lostPetReports == null ? "No Reports Available" : lostPetReports.map((report: LostPetReport) => (
          
          <div key={report.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px", marginRight:"50px",cursor: "pointer" }}
          onClick={() => handleLostPetReportClick(report.id)}>
           
          <img src={transformImage(report.imageUrl)} alt="Pet" style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}/>
          <p style={{ marginBottom: "10px" }}>Pet Name: {report.petName}</p>
          <p style={{ marginBottom: "10px" }}>Animal Type: {report.animalType}</p>
          <p style={{ marginBottom: "10px" }}>Animal Breed: {report.animalBreed}</p>
        </div>
        
        ))}


        </div>
      </div>


      <div className="flex border-t-2 border-black my-4 flex-col items-center border-b-5 pb-4 w-full h-full">

        <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">Found Pets</h2>
        <div className="flex mt-2 mb-2">
        {foundPetReports == null ? "No Reports Available" : foundPetReports.map((report: FoundPetReport) => (
          
          <div key={report.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px", marginRight:"50px",cursor: "pointer" }}
            /*onClick={() => handleReportClick(report.id)}*/>          
            <img src={transformImage(report.imageUrl)} alt="Pet" style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}/>
          
          <p style={{ marginBottom: "10px" }}>Pet Name: {report.petName}</p>
          <p style={{ marginBottom: "10px" }}>Animal Type: {report.animalType}</p>
          <p style={{ marginBottom: "10px" }}>Animal Breed: {report.animalBreed}</p>
        </div>
        ))}

        </div>
      </div>
      
    </main>
  )
}

export default LostAndFound