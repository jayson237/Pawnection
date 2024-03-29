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

  return (
    <main className="flex min-h-screen flex-col items-center divide-gray-100 w-full h-full">
      <div className="flex flex-col pb-4 w-full h-1/4 px-4 items-center mt-10">
        <h2 className="text-3xl font-semibold tracking-tight mb-4 flex">
          Lost & Found Pets
        </h2>

        <div className="flex mt-2 mb-2 ">
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
        </div>

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

      <div className="flex border-t-2 border-black flex-col pb-4 w-full h-full px-4 items-center">
        <h2 className="text-3xl font-semibold tracking-tight mb-4 flex">
          Lost Pets
        </h2>

        <div className="flex mt-2 mb-2 ">
          {lostPetReports == null
            ? "No Reports Available"
            : lostPetReports.map((report: LostPetReport) => (
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
                    className="max-w-full h-auto mb-5"
                  />
                  <p className="mb-[10px]">Pet Name: {report.petName}</p>
                  <p className="mb-[10px]">Animal Type: {report.animalType}</p>
                  <p className="mb-[10px]">
                    Animal Breed: {report.animalBreed}
                  </p>
                </div>
              ))}
        </div>
      </div>

      <div className="flex border-t-2 border-black my-4 flex-col items-center border-b-5 pb-4 w-full h-full">
        <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
          Found Pets
        </h2>
        <div className="flex mt-2 mb-2">
          {foundPetReports == null
            ? "No Reports Available"
            : foundPetReports.map((report: FoundPetReport) => (
                <div
                  key={report.id}
                  className="flex flex-col items-center mb-5 mr-12 cursor-pointer"
                >
                  <Image
                    src={transformImage(report.imageUrl)}
                    width={200}
                    height={200}
                    alt="Pet"
                    className="max-w-full h-auto mb-5"
                  />

                  <p className="mb-[10px]">Pet Name: {report.petName}</p>
                  <p className="mb-[10px]">Animal Type: {report.animalType}</p>
                  <p className="mb-[10px]">
                    Animal Breed: {report.animalBreed}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </main>
  )
}

export default LostAndFound
