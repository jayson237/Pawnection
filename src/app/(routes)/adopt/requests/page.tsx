import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"

import HeaderTitle from "../../../../components/HeaderTitle"
import { getAllOwnAdpotRequests } from "../../../../lib/api/adopt"

export default async function AdoptPetRequests() {
  const ownrequests = await getAllOwnAdpotRequests()

  if (!ownrequests) {
    return notFound()
  }
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px]">
        <HeaderTitle className="max-w-full">Your Adoption Requests</HeaderTitle>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 w-full">
        {ownrequests?.length > 0 ? (
          ownrequests.map((request) => (
            <Link
              href={"/adopt/process/" + request.id}
              key={request.id}
              className="bg-white rounded-lg shadow-md"
            >
              <img
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
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center">
            <p>You have not made any adoption requests</p>
          </div>
        )}
      </div>
    </div>
  )
}
