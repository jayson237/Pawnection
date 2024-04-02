"use client"

import { LostPetReport } from "@prisma/client"
import { useState } from "react"
import HeaderTitle from "../HeaderTitle"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Label } from "../ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"


import getLostPetReportsByType from "@/actions/getLostPetReportsByType"
import getAllLostPetReports from "@/actions/getAllLostPetReports"

const AllLostPetReports = ({
    allLostPetReports,
  }: {
    allLostPetReports: LostPetReport[] | null
  }) => {

    const [lostPetReports, setLostPetReports] = useState(allLostPetReports)

    console.log(allLostPetReports)
    const transformImage = (url:string) => {
        const parts = url.split("/upload/")
        const transformationString = "w_500,h_500,c_thumb,g_face,r_max,f_auto,bo_5px_solid_black/";
        return `${parts[0]}/upload/${transformationString}${parts[1]}`
    }

    const router = useRouter()

    const handleLostPetReportClick = (reportId: string) => {
        router.push(`/lostAndFound/lostPetReportPage/${reportId}`)
    }


    // const fetchReports = async (animalType: string) => {
    //   // Constructing a query string
    //   const queryString = new URLSearchParams({ animalType }).toString();
    //   const response = await fetch(`/api/lostAndFound/getLostPetReportsByType?${queryString}`, {
    //     method: "GET",
    //     // headers: { // This line is commented out because GET requests typically don't need a Content-Type header
    //     //   'Content-Type': 'application/json',
    //     // },
    //   });
    //   if (!response.ok) {
    //       throw new Error("Failed to fetch reports.");
    //   }
    //   const data = await response.json();
    //   setLostPetReports(data);
    // };
    


    return (
        <div className="space-y-6 flex flex-col items-center justify-center w-full max-w-[1240px] mx-auto md:px-0 px-4">
        <div className="py-[60px]">
          <HeaderTitle className="max-w-full">
            All Lost Pet Reports
          </HeaderTitle>
  
          <div className="mb-5 mt-5">
                <Label>Pet Type</Label>
                <Select
                  onValueChange={(val) => {
                    const fetchData = async () => {
                      if (val === "All") {
                        setLostPetReports(allLostPetReports);
                      } else {
                        const data = await getLostPetReportsByType(val);
                        setLostPetReports(data);
                      }
                    };
                    fetchData();
                  }}
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

          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
            {lostPetReports == null 
            ? "No Lost Pet Reports "
            : lostPetReports.map((report, index) => (
              <div
                key={index}
                className="flex border p-4 rounded-xl bg-white h-full  cursor-pointer"
                onClick={() => handleLostPetReportClick(report.id)}
              >
                <Image
                  src={transformImage(report.imageUrl)} 
                  alt="None"
                  width={60}
                  height={60}
                  className="w-24 h-24 object-cover rounded-lg mr-4" 
                />
                <div>
                  <h3 className="text-xl font-semibold mb-1">{report.petName}</h3>
                  <p className="text-sm mb-2 text-mainAccent">
                    {report.animalType}
                  </p> 
                  <p className="text-sm mb-3">{report.reportDescription}</p>
                  {/* <div className="flex flex-wrap">
                    {hangout.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs mr-2 mb-2 py-1 px-3 rounded-lg bg-gray-50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div> */}
                  {/* <div className="flex items-center mt-2">
                    <span className="inline-block w-8 h-8 rounded-full overflow-hidden mr-2">
                      <Image
                        src={hangout.avatar}
                        alt={`${hangout.contact}'s avatar`}
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <span className="text-sm">@{hangout.contact}</span>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

export default AllLostPetReports

