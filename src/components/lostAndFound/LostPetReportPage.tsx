"use client"

import { useToast } from "@/hooks/useToast"
import { SafeUser } from "@/types"
import { LostPetReport } from "@prisma/client"
import Image from "next/image"
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

const LostPetReportPage = ({
  lostPetReport,
  currUser,
}: {
  lostPetReport: LostPetReport | null
  currUser: SafeUser | null
}) => {
  const { toast } = useToast()
  const [thisLostPetReport, setThisLostPetReport] = useState(lostPetReport)
  const [formattedLastSeenDate, setFormattedLastSeenDate] = useState("")
  const [reportActive, setReportActive] = useState(true)
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

    fetchCreatorInfo(thisLostPetReport!.userId)
  }, [])

  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_500,h_500,c_thumb,g_face,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }

  useEffect(() => {
    if (thisLostPetReport?.lastSeenDate) {
      const date = new Date(thisLostPetReport.lastSeenDate)
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      setFormattedLastSeenDate(formattedDate)
    }
  }, [thisLostPetReport?.lastSeenDate])

  const deleteReport = async () => {
    if (thisLostPetReport) {
      const response = await fetch("/api/lostAndFound/deleteLostPetReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: thisLostPetReport.id }),
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
      router.push("/lostAndFound/losses")
    }
  }

  const updateStatus = async () => {
    if (thisLostPetReport) {
      const response = await fetch(
        "/api/lostAndFound/updateLostPetReportStatus",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: thisLostPetReport.id }),
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
      setReportActive(false)
      await fetchReportData()
    }
  }

  const revertStatus = async () => {
    if (thisLostPetReport) {
      const response = await fetch(
        "/api/lostAndFound/unupdateLostPetReportStatus",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId: thisLostPetReport.id }),
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
      setReportActive(true)
      await fetchReportData()
    }
  }

  const updateReport = () => {
    router.push(`/lostAndFound/updateLostPetReportPage/${lostPetReport?.id}`)
  }

  const fetchReportData = async () => {
    if (!lostPetReport?.id) return

    const response = await fetch(
      `/api/lostAndFound/getLostPetReportById?id=${lostPetReport?.id}`,
    )
    if (!response.ok) {
      throw new Error("Failed to fetch report data")
    }
    const data = await response.json()
    setThisLostPetReport(data)
  }

  useEffect(() => {
    fetchReportData()
  }, [lostPetReport?.id])

  return (
    <div className="container mx-auto w-full h-full px-4 py-5">
      <div className="flex flex-row gap-x-8 mb-8">
        <div className="flex-shrink-0 w-[512px] h-[512px]">
          <Image
            src={transformImage(thisLostPetReport!.imageUrl)}
            layout="responsive"
            width={512}
            height={512}
            objectFit="cover"
            alt={`Lost pet named ${thisLostPetReport!.petName}`}
          />
        </div>
        <div className="w-[410px] h-[512px]">
          <div className="p-4 h-full overflow-auto">
            <h1 className="text-left font-bold text-3xl mb-4">Basic Info</h1>
            <hr className="mb-4 custom-divider" />
            <div className="space-y-6">
              <p className="text-lg">
                <span className="font-bold">Pet Name:</span>{" "}
                {thisLostPetReport!.petName}
              </p>
              <p className="text-lg">
                <span className="font-bold">Sex:</span>{" "}
                {thisLostPetReport!.petSex}
              </p>
              <p className="text-lg">
                <span className="font-bold">Species:</span>{" "}
                {thisLostPetReport!.animalBreed}
              </p>
              <p className="text-lg">
                <span className="font-bold">Description:</span>{" "}
                {thisLostPetReport!.reportDescription}
              </p>
              <p className="text-lg">
                <span className="font-bold">Area Last Seen:</span>{" "}
                {thisLostPetReport!.lastSeenArea}
              </p>
              <p className="text-lg">
                <span className="font-bold">Last Seen Date:</span>{" "}
                {formattedLastSeenDate}
              </p>
              <p className="text-lg">
                <span className="font-bold">Status:</span>{" "}
                {thisLostPetReport!.isActive ? "Missing" : "Pet has been found"}
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
                {thisLostPetReport!.reportMessage}
              </p>
              <p className="text-lg">
                <span className="font-bold">Contact Detail:</span>{" "}
                {thisLostPetReport!.contactDetails}
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
          {thisLostPetReport!.userId === currUser?.id &&
            thisLostPetReport!.isActive && (
              <Button className="w-full" onClick={updateReport}>
                Edit Report
              </Button>
            )}
          {thisLostPetReport!.userId === currUser?.id && (
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
          {thisLostPetReport!.userId === currUser?.id &&
          thisLostPetReport!.isActive ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full bg-mainAccent hover:bg-mainAccent/90">
                  Pet has been found
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
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-primary"
                    onClick={revertStatus}
                  >
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  )
}

export default LostPetReportPage
