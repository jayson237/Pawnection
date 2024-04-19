"use client"

import { useToast } from "@/hooks/useToast"
import { SafeUser } from "@/types"
import { FoundPetReport } from "@prisma/client"
import Image from "next/legacy/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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
  const [thisFoundPetReport, setThisFoundPetReport] = useState(foundPetReport)
  const [formattedFoundDate, setFormattedFoundDate] = useState("")
  const router = useRouter()

  const [creatorImage, setCreatorImage] = useState("")
  const [creatorName, setCreatorName] = useState("")
  const [creatorContactDetails, setCreatorContactDetails] = useState("")

  useEffect(() => {
    const fetchCreatorInfo = async (userId: string) => {
      try {
        const response = await fetch(
          "/api/lostAndFound/getReportCreatorInfo?id=" + userId,
          { method: "GET" },
        )

        if (!response.ok) {
          throw new Error("Error loading reports")
        }

        const data = await response.json()
        const image = data.image
        setCreatorImage(image)

        const name = data.name
        setCreatorName(name)

        const contactDetails = data.email
        setCreatorContactDetails(contactDetails)
      } catch (error) {
        console.error("Failed to fetch user profile picture: ", error)
      }
    }

    fetchCreatorInfo(thisFoundPetReport!.userId)
  }, [])

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
    if (thisFoundPetReport) {
      const response = await fetch("/api/lostAndFound/deleteFoundPetReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: thisFoundPetReport.id }),
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
    if (thisFoundPetReport) {
      const response = await fetch(
        "/api/lostAndFound/updateFoundPetReportStatus",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: thisFoundPetReport.id }),
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
    if (thisFoundPetReport) {
      const response = await fetch(
        "/api/lostAndFound/unupdateFoundPetReportStatus",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: thisFoundPetReport.id }),
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

  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
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
      setThisFoundPetReport(data)
    } catch (error) {
      console.error("Failed to fetch report:", error)
    }
  }
  useEffect(() => {
    fetchReportData()
  }, [foundPetReport?.id])

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex flex-row gap-x-8 mb-8">
        <div className="flex-shrink-0 w-[512px] h-[512px]">
          <Image
            src={transformImage(thisFoundPetReport!.imageUrl)}
            layout="responsive"
            width={512}
            height={512}
            objectFit="cover"
            alt={`Found pet named ${thisFoundPetReport!.petName}`}
          />
        </div>

        <div className="w-[410px] h-[512px]">
          <div className="p-4 h-full overflow-auto">
            <h1 className="text-left font-bold text-3xl mb-4">Basic Info</h1>
            <hr className="mb-4 custom-divider" />
            <div className="space-y-6">
              <p className="text-lg">
                <span className="font-bold">Pet Name:</span>{" "}
                {thisFoundPetReport!.petName}
              </p>
              <p className="text-lg">
                <span className="font-bold">Sex:</span>{" "}
                {thisFoundPetReport!.petSex}
              </p>
              <p className="text-lg">
                <span className="font-bold">Species:</span>{" "}
                {thisFoundPetReport!.animalBreed}
              </p>
              <p className="text-lg">
                <span className="font-bold">Description:</span>{" "}
                {thisFoundPetReport!.reportDescription}
              </p>
              <p className="text-lg">
                <span className="font-bold">Area Last Seen:</span>{" "}
                {thisFoundPetReport!.foundArea}
              </p>
              <p className="text-lg">
                <span className="font-bold">Found Date:</span>{" "}
                {formattedFoundDate}
              </p>
              <p className="text-lg">
                <span className="font-bold">Status:</span>{" "}
                {thisFoundPetReport!.isActive ? "Found" : "Returned to owner"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[410px] h-[512px]">
          <div className="p-4 h-full overflow-auto">
            <h1 className="text-left font-bold text-3xl mb-4">
              Contact Details
            </h1>
            <hr className="mb-4 custom-divider" />
            <div className="space-y-6">
              <p className="text-lg">
                <span className="font-bold">Message from Owner:</span>{" "}
                {thisFoundPetReport!.reportMessage}
              </p>
              <p className="text-lg">
                <span className="font-bold">Contact Detail:</span>{" "}
                {thisFoundPetReport!.contactDetails}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-submain h-[250px] rounded-3xl px-28 py-6 flex justify-between">
        <div className="flex items-center space-x-10">
          <div className="w-32 h-32 relative overflow-hidden rounded-lg">
            <Image
              src={creatorImage || "/icon.png"}
              layout="fill"
              objectFit="cover"
              alt={`Profile picture of ${creatorName || "user"}`}
              className="rounded-full"
            />
          </div>
          <div className="space-y-2">
            <p className="font-bold text-xl">{creatorName}</p>
            <p>{creatorContactDetails}</p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2 self-center">
          {thisFoundPetReport!.userId === currUser?.id &&
            thisFoundPetReport!.isActive && (
              <Button className="w-full" onClick={updateReport}>
                Edit Report
              </Button>
            )}
          {thisFoundPetReport!.userId === currUser?.id && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full" variant="destructive">
                  Delete Report
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this report
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
          {thisFoundPetReport!.userId === currUser?.id ? (
            thisFoundPetReport!.isActive ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full bg-mainAccent hover:bg-mainAccent/90">
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
                      className="bg-primary"
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
  )
}
export default FoundPetReportPage
