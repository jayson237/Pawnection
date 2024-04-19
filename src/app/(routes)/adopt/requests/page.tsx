import BackButton from "@/components/BackButton"
import HeaderTitle from "@/components/HeaderTitle"
import { getAllOwnAdoptRequests } from "@/lib/actions/adopt"
import { getCurrentUser } from "@/lib/actions/user"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { redirect } from "next/navigation"
import React from "react"

export default async function AdoptPetRequests() {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect("/auth")
  const ownrequests = await getAllOwnAdoptRequests()
  if (
    !ownrequests ||
    !currentUser ||
    currentUser.type === "PetAdoptionCentre"
  ) {
    return notFound()
  }

  if (!ownrequests) {
    return notFound()
  }
  if (currentUser && !currentUser.username) redirect("/settings")
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-8">
      <div className="py-[60px] w-full">
        <div className="flex">
          <BackButton />

          <div className="mx-auto flex flex-col items-center">
            <HeaderTitle className="max-w-full max-md:text-3xl">
              My Adoption Requests
            </HeaderTitle>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 w-full">
        {ownrequests?.length > 0 ? (
          ownrequests.map((request) => (
            <Link
              href={"/adopt/requests/" + request.adoptablePet.id}
              key={request.id}
              className="bg-white rounded-lg shadow-md"
            >
              <Image
                width={400}
                height={400}
                src={request.adoptablePet.imageUrl}
                alt={request.adoptablePet.name}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {request.adoptablePet.name}
                </h2>
                <p className="text-gray-500">{request.adoptablePet.breed}</p>
                <p className="text-gray-500">{request.age} years old</p>
                <div className="mt-4 border rounded-xl px-1.5 py-1 flex items-center text-sm w-fit">
                  {request?.request_status === "Pending" ? (
                    <span className="text-yellow-500 font-semibold">
                      Pending
                    </span>
                  ) : request?.request_status === "Approved" ? (
                    <span className="text-green-500 font-semibold">
                      Approved
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">Rejected</span>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center text-center">
            <p>You have not made any adoption requests</p>
          </div>
        )}
      </div>
    </div>
  )
}
