"use client"

import { useToast } from "@/hooks/useToast"
import { SafeUser } from "@/types"
import { FoundPetReport } from "@prisma/client"
import { Edit, Trash } from "lucide-react"
import Image from "next/legacy/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import TimeStamp from "../TimeStamp"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog"
import { Button } from "../ui/Button"

const FoundPetReportPage = ({
  foundPetReport,
  currUser,
}: {
  foundPetReport: FoundPetReport | null
  currUser: SafeUser | null
}) => {
  const { toast } = useToast()
  const router = useRouter()
  const time = foundPetReport?.createdAt
    ? new Date(foundPetReport.createdAt).toISOString()
    : ""
  const [fetchedReport, setFetchedReport] = useState<FoundPetReport | null>(
    foundPetReport,
  )
  const [formattedFoundDate, setFormattedFoundDate] = useState("")
  const [creatorImage, setCreatorImage] = useState("")
  const [creatorUsername, setCreatorUsername] = useState("")

  useEffect(() => {
    const fetchCreatorInfo = async () => {
      try {
        const response = await fetch(
          "/api/lostAndFound/getReportCreatorInfo?id=" + foundPetReport!.userId,
          { method: "GET", cache: "no-cache" },
        )

        if (!response.ok) {
          throw new Error("Error loading reports")
        }

        const data = await response.json()
        setCreatorImage(data.image)
        setCreatorUsername(data.username)
      } catch (error) {
        console.error("Failed to fetch user profile picture: ", error)
      }
    }

    fetchCreatorInfo()
  }, [])

  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }

  useEffect(() => {
    if (fetchedReport?.foundDate) {
      const date = new Date(fetchedReport.foundDate)
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      setFormattedFoundDate(formattedDate)
    }
  }, [fetchedReport?.foundDate])

  const deleteReport = async () => {
    if (fetchedReport) {
      const response = await fetch("/api/lostAndFound/deleteFoundPetReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: fetchedReport.id }),
      })
      const data = await response.json()

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Failed to delete report",
          description: data.message,
        })
      }
      toast({ title: "Report deleted successfully" })
      router.push("/lostAndFound/founds")
    }
  }

  const updateStatus = async () => {
    if (fetchedReport) {
      const response = await fetch(
        "/api/lostAndFound/updateFoundPetReportStatus",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: fetchedReport.id }),
        },
      )
      const data = await response.json()
      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Failed to update report status",
          description: data.message,
        })
      }
      toast({ title: "Report status updated successfully" })
      await fetchReportData()
    }
  }

  const revertStatus = async () => {
    if (fetchedReport) {
      const response = await fetch(
        "/api/lostAndFound/unupdateFoundPetReportStatus",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: fetchedReport.id }),
        },
      )

      const data = await response.json()
      if (!response.ok) {
        if (!response.ok) {
          toast({
            variant: "destructive",
            title: "Failed to revert report status",
            description: data.message,
          })
        }
      }
      toast({ title: "Report status reverted successfully" })
      await fetchReportData()
    }
  }

  const updateReport = () => {
    router.push(`/lostAndFound/updateFoundPetReportPage/${foundPetReport?.id}`)
  }

  const fetchReportData = async () => {
    if (!foundPetReport?.id) return

    try {
      const response = await fetch(
        `/api/lostAndFound/getFoundPetReportById?id=${foundPetReport?.id}`,
      )
      if (!response.ok) {
        throw new Error("Failed to fetch report data")
      }
      const data = await response.json()
      setFetchedReport(data)
    } catch (error) {
      console.error("Failed to fetch report:", error)
    }
  }

  useEffect(() => {
    fetchReportData()
  }, [foundPetReport?.id])

  return (
    <div className="flex flex-row space-x-12">
      <div className="flex-shrink-0 w-[512px] h-[512px]">
        <Image
          src={transformImage(fetchedReport!.imageUrl)}
          layout="responsive"
          width={512}
          height={512}
          priority
          objectFit="cover"
          alt={`Found pet named ${fetchedReport!.petName}`}
          className="rounded-lg sticky top-28"
        />
      </div>

      <div className="flex flex-col gap-y-8">
        <div className="flex flex-row items-center justify-between">
          <Link
            href={`/profile/${creatorUsername}`}
            className="cursor-pointer flex flex-row space-x-4 items-center"
          >
            <Image
              src={creatorImage || "/icon.png"}
              width={64}
              height={64}
              className="rounded-full"
              alt=""
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{creatorUsername}</p>
              <TimeStamp datetimeISO={time} />
            </div>
          </Link>

          <div>
            <div className="flex flexc-row items-center space-x-2">
              {fetchedReport?.userId === currUser?.id &&
                fetchedReport?.isActive && (
                  <Button className="w-fit" onClick={updateReport}>
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
              {fetchedReport?.userId === currUser?.id && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-fit" variant="destructive">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this report
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteReport}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              {fetchedReport?.userId === currUser?.id ? (
                fetchedReport?.isActive ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-fit bg-mainAccent hover:bg-mainAccent/90">
                        Pet has been returned
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to dismiss this report?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You are going to dismiss this report once you click
                          &quot;Yes&quot;
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-primary hover:bg-primary/90"
                          onClick={updateStatus}
                        >
                          Yes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full bg-mainAccent hover:bg-mainAccent/90">
                        Revert report
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to revert this report?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You are going to revert this report once you click
                          &quot;Yes&quot;
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-primary hover:bg-primary/90"
                          onClick={revertStatus}
                        >
                          Yes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-16">
          <div>
            <div className="h-full w-[320px]">
              <h1 className="text-left font-bold text-3xl mb-4">Pet Info</h1>
              <hr className="mb-4 custom-divider" />
              <div className="grid grid-cols-2 gap-12">
                <div className="text-lg">
                  <span className="font-bold">Pet Name</span>
                  <p>{fetchedReport?.petName}</p>
                </div>
                <div className="text-lg">
                  <span className="font-bold">Gender</span>
                  <p>{fetchedReport?.petSex}</p>
                </div>
                <div className="text-lg">
                  <span className="font-bold">Species</span>
                  <p>{fetchedReport?.animalBreed}</p>
                </div>
                <div className="text-lg">
                  <span className="font-bold">Status</span>
                  <p>
                    {fetchedReport?.isActive ? "Found" : "Returned to owner"}
                  </p>
                </div>
                <div className="text-lg">
                  <span className="font-bold">Area Last Seen</span>
                  <p>{fetchedReport?.foundArea}</p>
                </div>
                <div className="text-lg">
                  <span className="font-bold">Found Date</span>
                  <p>{formattedFoundDate}</p>
                </div>
              </div>
              <div className="text-lg mt-12">
                <span className="font-bold">Description</span>
                <p>{fetchedReport?.reportDescription}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="h-full">
              <h1 className="text-left font-bold text-3xl mb-4">
                Contact Details
              </h1>
              <hr className="mb-4 custom-divider" />
              <div className="grid grid-cols-1 gap-12">
                <div className="text-lg">
                  <span className="font-bold">Message from Owner</span>
                  <p>{fetchedReport?.reportMessage}</p>
                </div>
                <div className="text-lg">
                  <span className="font-bold">Contact Details</span>
                  <p>{fetchedReport?.contactDetails}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoundPetReportPage
