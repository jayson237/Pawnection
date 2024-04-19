"use client"

import { FoundPetReport } from "@prisma/client"
import { PawPrint, Search, X } from "lucide-react"
import Image from "next/legacy/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import HeaderTitle from "../HeaderTitle"
import Loading from "../Loading"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import FoundPetReportDialog from "./FoundPetReportDialog"

const AllFoundPetReports = () => {
  const [foundPetReports, setFoundPetReports] = useState<
    FoundPetReport[] | null
  >(null)
  const [isFoundPetReportDialogOpen, setIsFoundPetReportDialogOpen] =
    useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }

  const router = useRouter()

  const clearSearch = () => {
    setSearchTerm("")
  }

  const handleFoundPetReportClick = (reportId: string) => {
    router.push(`/lostAndFound/founds/${reportId}`)
  }

  const fetchReports = async (animalType: string) => {
    const url = `/api/lostAndFound/getFoundPetReports?type=${animalType}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch reports")
    }

    const data = await response.json()
    setFoundPetReports(data)
  }

  const navToLostPetReports = () => {
    router.push("/lostAndFound/losses")
  }

  useEffect(() => {
    fetchReports("All")
  }, [])

  useEffect(() => {
    fetch("/api/lostAndFound/found")
      .then((response) => response.json())
      .then((data) => setFoundPetReports(data.data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className="container">
      <div className="py-[60px]">
        <div className="header-container flex justify-center items-center mb-12 space-x-10">
          <HeaderTitle
            className="max-w-full cursor-pointer transition-all duration-300 text-3xl ease-in-out opacity-20 hover:opacity-100 hover:scale-110"
            onClick={navToLostPetReports}
          >
            Lost Pet Reports
          </HeaderTitle>
          <HeaderTitle className="header-title max-w-full cursor-pointer transition-all duration-300 ease-in-out">
            Found Pet Reports
          </HeaderTitle>
        </div>

        <div className="flex flex-row space-x-2 justify-center items-center">
          <Select
            onValueChange={(val) => {
              const fetchData = async () => {
                fetchReports(val)
              }
              fetchData()
            }}
            defaultValue="All"
          >
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder="Select Animal Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Dog">Dog</SelectItem>
              <SelectItem value="Cat">Cat</SelectItem>
              <SelectItem value="Bird">Bird</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
          <FoundPetReportDialog
            isOpen={isFoundPetReportDialogOpen}
            onClose={() => setIsFoundPetReportDialogOpen(false)}
            onReportCreated={() => fetchReports("All")}
          />

          <div className="flex flex-row items-center">
            <div className="relative flex grow items-center bg-white rounded-md">
              <Input
                type="text"
                placeholder="Search..."
                className="pr-24 py-2 grow bg-white outline-none rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm.length !== 0 && (
                <Button
                  onClick={clearSearch}
                  className="absolute right-8"
                  variant="search"
                >
                  <X className="text-gray-500 hover:text-primary duration-300 ease-in-out transition-all w-5 h-5" />
                </Button>
              )}
              <Button className="absolute right-2 pr-2" variant="search">
                <Search className="text-gray-500 w-5 h-5" />
              </Button>
            </div>
          </div>

          <Button
            className="w-48"
            onClick={() => setIsFoundPetReportDialogOpen(true)}
          >
            <PawPrint className="w-4 h-4 text-white mr-2" />
            Report found pet
          </Button>
        </div>
        {foundPetReports ? (
          foundPetReports.length > 0 ? (
            (() => {
              const filteredReports = foundPetReports
                .filter(
                  (report) =>
                    report.petName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.animalType
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.animalBreed
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.contactDetails
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.foundArea
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.petSex
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.reportMessage
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    report.reportDescription
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                )
                .sort((a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0))

              return filteredReports.length > 0 ? (
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 mt-6">
                  {filteredReports.map((report, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer ${!report.isActive ? "opacity-50" : ""}`}
                      onClick={() => handleFoundPetReportClick(report.id)}
                    >
                      <div className="w-full h-48 relative">
                        <Image
                          src={transformImage(report.imageUrl)}
                          layout="fill"
                          objectFit="cover"
                          alt="Found Pet"
                          className="rounded-t-xl"
                        />
                      </div>
                      <div className="flex flex-col p-4 rounded-b-xl bg-white cursor-pointer shadow-lg min-h-[170px]">
                        <h3 className="text-xl font-semibold mb-1">
                          {report.petName}
                        </h3>
                        <p className="text-sm mb-2 text-mainAccent">
                          {report.animalType}
                        </p>
                        <p className="text-sm line-clamp-2">
                          {report.reportDescription}
                        </p>
                        <div className="mt-auto">
                          <div className="border rounded-xl px-1.5 py-1 flex items-center text-sm w-fit">
                            {report.isActive ? (
                              <p className="text-green-500 font-semibold">
                                Found Pet
                              </p>
                            ) : (
                              <p className="text-mainAccent font-semibold">
                                Pet has been returned
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="col-span-full text-center mt-4">
                  No reports found
                </div>
              )
            })()
          ) : (
            <div className="col-span-full text-center mt-4">
              No reports found
            </div>
          )
        ) : (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  )
}

export default AllFoundPetReports
