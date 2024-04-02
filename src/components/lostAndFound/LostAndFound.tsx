"use client"

import { FoundPetReport, LostPetReport } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "../ui/Button"
import FoundPetReportDialog from "./FoundPetReportDialog"
import LostPetReportDialog from "./LostPetReportDialog"

const LostAndFound = ({
  allLostPetReports,
  allFoundPetReports,
}: {
  allLostPetReports: LostPetReport[] | null
  allFoundPetReports: FoundPetReport[] | null
}) => {
  const [allSelected, setAllSeleceted] = useState(false)
  const [dogsSelected, setDogsSeleceted] = useState(false)
  const [catsSelected, setCatsSeleceted] = useState(false)
  const [birdsSelected, setBirdsSeleceted] = useState(false)
  const [othersSelected, setOthersSeleceted] = useState(false)
  const [isLostPetReportDialogOpen, setIsLostPetReportDialogOpen] =
    useState(false)
  const [isFoundPetReportDialogOpen, setIsFoundPetReportDialogOpen] =
    useState(false)
  const [lostPetReports, setLostPetReports] = useState(allLostPetReports)
  const [foundPetReports, setFoundPetReports] = useState(allFoundPetReports)

  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_200,h_200,c_thumb,g_face,r_max,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }

  const router = useRouter()

  const handleLostPetReportClick = (reportId: string) => {
    router.push(`/lostAndFound/lostPetReportPage/${reportId}`)
  }

  const handleFoundPetReportClick = (reportId: string) => {
    router.push(`/lostAndFound/foundPetReportPage/${reportId}`)
  }  

  const handleViewMoreLostPetReports = () => {
    router.push(`/lostAndFound/allLostPetReports`)
  }

  const handleViewMoreFoundPetReports = () => {
    router.push(`/lostAndFound/allFoundPetReports`)
  }  

  return (
    <main className="flex min-h-screen flex-col items-center divide-gray-100 w-full h-full">
      <div className="flex flex-col pb-4 w-full h-1/4 px-4 items-center mt-10">
        <h2 className="text-3xl font-semibold tracking-tight mb-4 flex">
          Lost & Found Pets
        </h2>

        {/* <div className="flex mt-2 mb-2 ">
          <Button
            onClick={() => {
              setAllSeleceted(true)
              setDogsSeleceted(false)
              setCatsSeleceted(false)
              setBirdsSeleceted(false)
              setOthersSeleceted(false)
            }}
            variant="outline"
            className={
              allSelected
                ? "mr-8 w-40 bg-white text-black"
                : "mr-8 w-40 bg-gray-300"
            }
          >
            All
          </Button>

          <Button
            onClick={() => {
              setDogsSeleceted(true)
              setAllSeleceted(false)
              setCatsSeleceted(false)
              setBirdsSeleceted(false)
              setOthersSeleceted(false)
            }}
            variant="outline"
            className={
              dogsSelected
                ? "mr-8 w-40 bg-white text-black"
                : "mr-8 w-40 bg-gray-300"
            }
          >
            Dogs
          </Button>

          <Button
            onClick={() => {
              setCatsSeleceted(true)
              setDogsSeleceted(false)
              setAllSeleceted(false)
              setBirdsSeleceted(false)
              setOthersSeleceted(false)
            }}
            variant="outline"
            className={
              catsSelected
                ? "mr-8 w-40 bg-white text-black"
                : "mr-8 w-40 bg-gray-300"
            }
          >
            Cats
          </Button>

          <Button
            onClick={() => {
              setBirdsSeleceted(true)
              setDogsSeleceted(false)
              setCatsSeleceted(false)
              setAllSeleceted(false)
              setOthersSeleceted(false)
            }}
            variant="outline"
            className={
              birdsSelected
                ? "mr-8 w-40 bg-white text-black"
                : "mr-8 w-40 bg-gray-300"
            }
          >
            Birds
          </Button>

          <Button
            onClick={() => {
              setOthersSeleceted(true)
              setDogsSeleceted(false)
              setCatsSeleceted(false)
              setBirdsSeleceted(false)
              setAllSeleceted(false)
            }}
            variant="outline"
            className={
              othersSelected
                ? "mr-8 w-40 bg-white text-black"
                : "mr-8 w-40 bg-gray-300"
            }
          >
            Others
          </Button>
        </div> */}

        <div className="flex mt-4">
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

          <Button
            variant="outline"
            className="mr-8 w-60 mb-5 bg-black text-white"
            onClick={() => setIsFoundPetReportDialogOpen(true)}
          >
            Report A Found Pet
          </Button>

          <FoundPetReportDialog
            isOpen={isFoundPetReportDialogOpen}
            onClose={() => setIsFoundPetReportDialogOpen(false)}
          />
        </div>
      </div>

      <div className="flex border-t-2 border-black my-4 flex-col items-center border-b-5 pb-4 w-full h-full">
      
        <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
          Lost Pets
        </h2>

        <div className="flex mt-2 mb-2 items-center ">
          {lostPetReports == null
            ? "No Reports Available"
            : lostPetReports.slice(-5).map((report: LostPetReport) => (
                <div
                  key={report.id}
                  className="flex flex-col items-center mb-5 mr-12 cursor-pointer"
                  onClick={() => handleLostPetReportClick(report.id)}
                >
                  <Image
                    src={transformImage(report.imageUrl)}
                    width={200}
                    height={200}
                    alt="Pet"
                    className="max-w-full h-auto mb-5 rounded-full"
                  />
                  <p className="mb-[10px]">Pet Name: {report.petName}</p>
                  <p className="mb-[10px]">Animal Type: {report.animalType}</p>
                  <p className="mb-[10px]">
                    Animal Breed: {report.animalBreed}
                  </p>
                </div>
              ))}
          <Button type="button" className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3"
                  onClick ={() => handleViewMoreLostPetReports()}>
            <div className="flex flex-row align-middle">
              <span className="mr-2">More</span>
              <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </Button>
        </div>
      </div>

      <div className="flex border-t-2 border-black my-4 flex-col items-center border-b-5 pb-4 w-full h-full">
        <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
          Found Pets
        </h2>
        <div className="flex mt-2 mb-2 items-center">
          {foundPetReports == null
            ? "No Reports Available"
            : foundPetReports.slice(-5).map((report: FoundPetReport) => (
                <div
                  key={report.id}
                  className="flex flex-col items-center mb-5 mr-12 cursor-pointer"
                  onClick={() => handleFoundPetReportClick(report.id)}
                >
                  <Image
                    src={transformImage(report.imageUrl)}
                    width={200}
                    height={200}
                    alt="Pet"
                    className="max-w-full h-auto mb-5 rounded-full"
                  />

                  <p className="mb-[10px]">Pet Name: {report.petName}</p>
                  <p className="mb-[10px]">Animal Type: {report.animalType}</p>
                  <p className="mb-[10px]">
                    Animal Breed: {report.animalBreed}
                  </p>
                </div>
              ))}
          <Button type="button" className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3"
                            onClick ={() => handleViewMoreFoundPetReports()}>
            <div className="flex flex-row align-middle">
              <span className="mr-2">More</span>
              <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default LostAndFound
