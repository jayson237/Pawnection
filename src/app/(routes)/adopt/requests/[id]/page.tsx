import HeaderTitle from "@/components/HeaderTitle"
import AdoptPetForm from "@/components/adopt/AdoptionRequest"
import { buttonVariants } from "@/components/ui/Button"
import { getOneAdoptablePets } from "@/lib/actions/adopt"
import { getCurrentUser } from "@/lib/actions/user"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"

export default async function AdoptProcessPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const currentUser = await getCurrentUser()
  const adoptablePet = await getOneAdoptablePets(params.id)

  const isCurrentAdopt =
    adoptablePet && adoptablePet?.adoptionRequests.length > 0

  if (
    !adoptablePet ||
    !currentUser ||
    adoptablePet.status === "Adopted" ||
    currentUser.type === "PetAdoptionCentre"
  ) {
    return notFound()
  }

  const adoptionRequestInfo = adoptablePet.adoptionRequests[0]

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4">
      <div className="py-[60px] w-full">
        <div className="flex">
          <Link
            className={cn(buttonVariants({ variant: "outline" }), "ml-5")}
            href="/adopt/pets"
          >
            Back
          </Link>

          <div className="mx-auto flex flex-col items-center">
            <HeaderTitle className="max-w-full max-md:text-3xl">
              Adoptable Pets
            </HeaderTitle>
          </div>
        </div>
      </div>

      <div className="relative grid sm:grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="sticky top-28 rounded-xl border border-gray-400 h-fit md:col-span-1">
          <div>
            <Image
              src={adoptablePet.imageUrl}
              alt={adoptablePet.name}
              width={1000}
              height={1000}
              className="rounded-t-xl h-full bg-cover bg-center w-full object-cover max-h-[440px]"
            />
          </div>
          <div className="px-3.5 py-4 space-y-2">
            <div>
              <h4 className="font-bold">Name</h4>
              <p>{adoptablePet.name}</p>
            </div>
            <div>
              <h4 className="font-bold">Type</h4>
              <p>{adoptablePet.type}</p>
            </div>
            <div>
              <h4 className="font-bold">Age</h4>
              <p>
                {adoptablePet.age} {adoptablePet.age > 1 ? "years" : "year"}
              </p>
            </div>
            <div>
              <h4 className="font-bold">Gender</h4>
              <p>{adoptablePet.gender}</p>
            </div>
            <div>
              <h4 className="font-bold">Breed</h4>
              <p>{adoptablePet.breed}</p>
            </div>
            <div>
              <h4 className="font-bold">Description</h4>
              <p>{adoptablePet.description}</p>
            </div>
          </div>
        </div>
        <div className="h-full md:col-span-2 px-4">
          <HeaderTitle className="max-w-full mt-4 max-md:text-3xl">
            {isCurrentAdopt
              ? "Adoption Request Information"
              : "Adoption Request Form"}
          </HeaderTitle>

          <div className="mt-6">
            {isCurrentAdopt ? (
              <div className="space-y-4">
                <div className="space-y-0.5">
                  <p className="font-bold">Full Name</p>
                  <p>{adoptionRequestInfo?.full_name || "-"}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold">Age</p>
                  <p>{adoptionRequestInfo?.age || "-"}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold">Phone Number</p>
                  <p>{adoptionRequestInfo?.phone_number || "-"}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold">Address</p>
                  <p>{adoptionRequestInfo?.address || "-"}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold">Type Desired</p>
                  <p>{adoptionRequestInfo?.type_desired || "-"}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold">Breed Desired</p>
                  <p>{adoptionRequestInfo?.breed_desired || "-"}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold">Work Details</p>
                  <p>{adoptionRequestInfo?.work_details || "-"}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold">Lifestyle Details</p>
                  <p>{adoptionRequestInfo?.lifestyle_details || "-"}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold">Status</p>
                  <p>
                    {adoptionRequestInfo?.request_status === "Pending" ? (
                      <span className="text-yellow-500">Pending</span>
                    ) : (
                      <span className="text-green-500">Approved</span>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <AdoptPetForm
                currentUser={currentUser}
                adoptablePet={adoptablePet}
                isCurrentAdopt={isCurrentAdopt as boolean}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
