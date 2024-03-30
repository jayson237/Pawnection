import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"

import HeaderTitle from "../../../../../components/HeaderTitle"
import { buttonVariants } from "../../../../../components/ui/Button"
import getCurrentUser from "../../../../../lib/actions/getCurrentUser"
import {
  getAllAdoptablePets,
  getOneAdoptablePets,
} from "../../../../../lib/api/adopt"
import { cn } from "../../../../../lib/utils"
import AdoptPetForm from "./form"

export default async function AdoptProcessPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const currentUser = await getCurrentUser()
  const adoptablePet = await getOneAdoptablePets(params.id)

  if (!adoptablePet || !currentUser) {
    return notFound()
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px] w-full">
        <HeaderTitle className="max-w-full">Adoptable Pets</HeaderTitle>
      </div>

      <div className="relative grid md:grid-cols-3 gap-8">
        <div className="sticky top-28 rounded-xl border border-gray-400 h-fit col-span-1">
          <div>
            <Image
              src={adoptablePet.imageUrl}
              alt={adoptablePet.name}
              width={1000}
              height={1000}
              className="rounded-xl h-full bg-cover bg-center w-full object-cover max-h-[440px]"
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

        <div className="h-full col-span-2">
          <HeaderTitle className="max-w-full">
            Fill in your personal information
          </HeaderTitle>

          <div className="mt-6">
            <AdoptPetForm
              currentUser={currentUser}
              adoptablePet={adoptablePet}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
