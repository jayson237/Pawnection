"use client"

import { toast } from "@/hooks/useToast"
import { cn } from "@/lib/utils"
import { AdoptablePet, AdoptionRequest } from "@prisma/client"
import { Trash } from "lucide-react"
import Image from "next/legacy/image"
import { useRouter } from "next/navigation"

import BackButton from "../BackButton"
import HeaderTitle from "../HeaderTitle"
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
import AdoptionCenterManagerForm from "./AdoptionCenterManagerForm"

export default function AdoptionCenterManager({
  data,
}: {
  data: AdoptablePet & { adoptionRequests: AdoptionRequest[] }
}) {
  const router = useRouter()

  const handleAccept = async (id: string) => {
    const set = await fetch(`/api/adoptionCenter/${data.id}/${id}/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
    const msg = await set.json()
    if (!set.ok) {
      toast({
        variant: "destructive",
        title: "Failed to accept request",
        description: msg.message,
      })
    } else {
      toast({
        title: "Request accepted successfully",
        description: "Successfully accepted! Please wait...",
      })
      router.refresh()
    }
  }

  const handleReject = async (id: string) => {
    const set = await fetch(`/api/adoptionCenter/${data.id}/${id}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
    const msg = await set.json()
    if (!set.ok) {
      toast({
        variant: "destructive",
        title: "Failed to reject request",
        description: msg.message,
      })
    } else {
      toast({
        title: "Request rejected successfully",
        description: "Successfully rejected! Please wait...",
      })
      router.refresh()
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <BackButton />
        <HeaderTitle>Edit Pet Details</HeaderTitle>

        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-fit" variant="destructive">
                <Trash className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this adoption listing
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const set = await fetch("/api/adoptionCenter/" + data.id, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      cache: "no-store",
                    })
                    const msg = await set.json()
                    if (!set.ok) {
                      toast({
                        variant: "destructive",
                        title: "Failed to delete",
                        description: msg.message,
                      })
                    } else {
                      toast({
                        title: "Deleted successfully",
                        description: "Successfully deleted! Please wait...",
                      })
                      router.push("/adoptionCenter")
                    }
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-12 mt-12 max-md:w-3/4 mx-auto">
        <div className="rounded-xl bg-white h-full col-span-1 shadow-lg">
          <div>
            <Image
              src={data.imageUrl}
              alt={data.name}
              priority
              width={1000}
              height={1000}
              className="rounded-t-xl h-full bg-cover bg-center w-full object-cover max-h-[440px]"
            />
          </div>
          <div className="px-8 pb-6">
            <AdoptionCenterManagerForm data={data} />
          </div>
        </div>

        <div className="h-full col-span-2">
          <HeaderTitle className="text-left text-2xl">Requests</HeaderTitle>

          <div className="mt-6">
            {data.adoptionRequests.length === 0 ? (
              <p className="">No requests yet</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {data.adoptionRequests.map((request) => (
                  <div
                    key={request.id}
                    className={cn(
                      "rounded-xl bg-white p-4",
                      "flex justify-between items-center",
                    )}
                  >
                    <div>
                      <p className="text-lg font-bold">{request.full_name}</p>
                      <p>{request.id}</p>
                    </div>

                    {request.request_status === "Pending" && (
                      <div className="space-x-2">
                        <Button
                          onClick={async () => await handleAccept(request.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          onClick={async () => await handleReject(request.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}

                    {request.request_status === "Approved" && (
                      <p className="text-green-600">Approved</p>
                    )}

                    {request.request_status === "Rejected" && (
                      <p className="text-red-600">Rejected</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
