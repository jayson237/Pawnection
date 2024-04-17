"use client"

import { LostPetReport } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/Button"
import HeaderTitle from "../HeaderTitle"
import { Label } from "../ui/Label"
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "../ui/Select"
import LostPetReportDialog from "./LostPetReportDialog"


const AllLostPetReports = ({
 allLostPetReports,
}: {
 allLostPetReports: LostPetReport[] | null
}) => {
 const [lostPetReports, setLostPetReports] = useState(allLostPetReports)
 const [isLostPetReportDialogOpen, setIsLostPetReportDialogOpen] = useState(false)
 const [searchTerm, setSearchTerm] = useState("")


 const transformImage = (url: string) => {
   const parts = url.split("/upload/")
   const transformationString =
     "w_500,h_500,c_thumb,g_face,f_auto/"
   return `${parts[0]}/upload/${transformationString}${parts[1]}`
 }


 const router = useRouter()


 const handleLostPetReportClick = (reportId: string) => {
   router.push(`/lostAndFound/losses/${reportId}`)
 }


 const fetchReports = async (animalType: string) => {
   const url = "/api/lostAndFound/getLostPetReports?type=".concat(animalType)


   const response = await fetch(url)
   if (!response.ok) {
     throw new Error("Failed to fetch reports")
   }


   const data = await response.json()
   setLostPetReports(data)
 }


 return (
   <div className="container mx-auto">
     <div className="py-[60px]">
       <HeaderTitle className="max-w-full">Lost Pet Reports</HeaderTitle>
       <div className="flex flex-row space-x-4 mt-5">

      <div className="flex items-center">       
       <Button
           variant="outline"
           className="mr-8 w-60 mb-5 bg-black text-white"
           onClick={() => setIsLostPetReportDialogOpen(true)}
         >           
         Report A Missing Pet
       </Button>


       <LostPetReportDialog
         isOpen={isLostPetReportDialogOpen}
         onClose={() => setIsLostPetReportDialogOpen(false)}
       />


       <div className="mb-5">
           <input
             type="text"
             placeholder="Search reports..."
             className="border px-4 py-2"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
         </div>


       <div className="mb-5 mt-5">
         <Label>Pet Type</Label>
         <Select
           onValueChange={(val) => {
             const fetchData = async () => {
               fetchReports(val)
             }
             fetchData()
           }}
           defaultValue="All"
         >
           <SelectTrigger className="w-[180px]">
             <SelectValue placeholder="Select Animal Type" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="All">All </SelectItem>
             <SelectItem value="Dog">Dog</SelectItem>
             <SelectItem value="Cat">Cat</SelectItem>
             <SelectItem value="Bird">Bird</SelectItem>
             <SelectItem value="Others">Others</SelectItem>
           </SelectContent>
         </Select>
       </div>
       </div>
       </div>


       <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
         {lostPetReports == null
           ? "No Lost Pet Reports "
           : lostPetReports.filter((report) => {
             return (
               report.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               report.animalType.toLowerCase().includes(searchTerm.toLowerCase()) ||
               report.animalBreed.toLowerCase().includes(searchTerm.toLowerCase()) ||
               report.contactDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
               report.lastSeenArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
               report.petSex.toLowerCase().includes(searchTerm.toLowerCase()) ||
               report.reportMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
               report.reportDescription.toLowerCase().includes(searchTerm.toLowerCase())
             )
           }).map((report, index) => (
             <div
             key={index}
             className={report.isActive ? "flex flex-col items-center border p-4 rounded-xl bg-white h-full cursor-pointer shadow-lg"
             : "flex flex-col items-center p-4 rounded-xl bg-gray-300/40 h-full  cursor-pointer shadow-lg"}
             onClick={() => handleLostPetReportClick(report.id)}
           >
             <div className="w-full h-48 relative"> 
               <Image
                 src={transformImage(report.imageUrl)}
                 layout="fill"
                 objectFit="cover"
                 alt="Lost Pet"
                 className="rounded-lg"
               />
             </div>
             <div className="mt-4">
               <h3 className="text-xl font-semibold mb-1">
                 Name: {report.petName}
               </h3>
               <p className="text-sm mb-2 text-mainAccent">
                 {report.animalType}
               </p>
               <p className="text-sm mb-2">Description: {report.reportDescription}</p>
               <p className="text-sm mb-3 text-gray-500">Status: {report.isActive ? "Missing Pet " : "Pet has been found"}</p>
             </div>
           </div>
             ))}
       </div>
     </div>
   </div>
 )
}


export default AllLostPetReports



