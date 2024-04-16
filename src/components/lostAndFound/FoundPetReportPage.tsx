"use client"


import { SafeUser } from "@/types"
import { FoundPetReport } from "@prisma/client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/Button"
import { getSpecifiedUser } from "@/lib/actions/user"

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

 const [creatorImage, setCreatorImage] = useState('');
 const [creatorName, setCreatorName] = useState('');
 const [creatorContactDetails, setCreatorContactDetails] = useState('');


 useEffect(() => {
  const fetchCreatorInfo = async (userId: string) => {
    try {
      console.log(userId)
      const response = await fetch("/api/lostAndFound/getReportCreatorInfo?id=" + userId, { method: "GET" });
      // console.log(response)

      if (!response.ok) {
        throw new Error("Error loading reports");
      }

      const data = await response.json();
      const image = data.image;
      setCreatorImage(image);

      const name = data.name
      setCreatorName(name)

      const contactDetails = data.email
      setCreatorContactDetails(contactDetails)

    } catch (error) {
      console.error("Failed to fetch user profile picture: ", error);
    }
  };

  fetchCreatorInfo(thisFoundPetReport!.userId);
}, []); 



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
       router.push("/lostAndFound")
     } catch (error) {
       console.error("Error deleting report:", error)
       alert("Failed to delete the report.")
     }
   }
 }


 const updateStatus = async () => {
   if (thisFoundPetReport && confirm("Are you sure you pet has been returned to owner?")) {
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


 const updateReport= () => {
   router.push(`/lostAndFound/updateFoundPetReportPage/${foundPetReport?.id}`)
 }


 const transformImage = (url: string) => {
   const parts = url.split("/upload/")
   const transformationString = "w_500,h_500,c_thumb,g_face,f_auto/"
   return `${parts[0]}/upload/${transformationString}${parts[1]}`
 }


 return (
   <div className="container mx-auto px-4 py-5">
     <div className="flex flex-row gap-x-8 mb-8">
       {/* Large Image Container */}
       <div className="flex-shrink-0" style={{ width: '512px', height: '512px' }}>
         <Image
           src={transformImage(thisFoundPetReport!.imageUrl)}
           layout="responsive"
           width={512}
           height={512}
           objectFit="cover"
           alt={`Found pet named ${thisFoundPetReport!.petName}`}
         />
       </div>


       {/* Basic Info Section */}
       <div style={{ width: '410px', height: '512px' }}>
         <div className="p-4 h-full overflow-auto">
           <h1 className="text-left font-bold text-3xl mb-4">Basic Info</h1>
           <hr className="mb-4 custom-divider" />
           <div className="space-y-6">
             <p className="text-lg"><span className="font-bold">Pet Name:</span> {thisFoundPetReport!.petName}</p>
             <p className="text-lg"><span className="font-bold">Sex:</span> {thisFoundPetReport!.petSex}</p>
             <p className="text-lg"><span className="font-bold">Species:</span> {thisFoundPetReport!.animalBreed}</p>
             <p className="text-lg"><span className="font-bold">Description:</span> {thisFoundPetReport!.reportDescription}</p>
             <p className="text-lg"><span className="font-bold">Area Last Seen:</span> {thisFoundPetReport!.foundArea}</p>
             <p className="text-lg"><span className="font-bold">Found Date:</span> {formattedFoundDate}</p>
             <p className="text-lg"><span className="font-bold">Status:</span> {thisFoundPetReport!.isActive ? "Found" : "Returned to owner"}</p>
           </div>
         </div>
       </div>


       {/* Contact Details & Lost Info Section */}
       <div style={{ width: '410px', height: '512px' }}>
         <div className="p-4 h-full overflow-auto">
           <h1 className="text-left font-bold text-3xl mb-4">Contact Details</h1>
           <hr className="mb-4 custom-divider" />
           <div className="space-y-6">
             <p className="text-lg"><span className="font-bold">Message from Owner:</span> {thisFoundPetReport!.reportMessage}</p>
             <p className="text-lg"><span className="font-bold">Contact Detail:</span> {thisFoundPetReport!.contactDetails}</p>
           </div>
         </div>
       </div>
     </div>


     {/* Button Section */}
     <div className="bg-[#FFECE4] h-[250px] rounded-3xl px-28 py-6 flex justify-between">
       <div className="flex items-center space-x-10">
         <div className="w-32 h-32 relative overflow-hidden rounded-lg">
           <Image
      src={thisFoundPetReport!.userId === currUser?.id ? currUser?.image! : creatorImage!}
      layout="fill"
             objectFit="cover"
             alt={`Profile picture of ${creatorName|| 'user'}`}
             className="rounded-full"
           />
         </div>
         <div className="space-y-2">
           <p className="font-bold text-xl">{creatorName}</p>
           <p>{creatorContactDetails}</p>
         </div>
       </div>
       <div className="flex flex-col items-center space-y-2 self-center">
         {thisFoundPetReport!.userId === currUser?.id && thisFoundPetReport!.isActive && (
           <Button className="w-full" onClick={updateReport}>Edit Report</Button>
         )}
         {thisFoundPetReport!.userId === currUser?.id && (
           <Button className="w-full" onClick={deleteReport}>Delete Report</Button>
         )}
         {thisFoundPetReport!.userId === currUser?.id && thisFoundPetReport!.isActive && (
           <Button className="w-full" onClick={updateStatus}>Pet has been returned</Button>
         )}
       </div>
     </div>
   </div>
 )
}
export default FoundPetReportPage


