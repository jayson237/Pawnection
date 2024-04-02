import HeaderTitle from "@/components/HeaderTitle"
import AdoptPetForm from "@/components/adoption/AdoptionRequest"
import { getOneAdoptablePets } from "@/lib/actions/adopt"
import { getCurrentUser } from "@/lib/actions/user"
import Image from "next/image"
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

  if (!adoptablePet || !currentUser) {
    return notFound()
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-6">
      <div className="py-[60px] w-full">
        <HeaderTitle className="max-w-full max-md:text-3xl">
          Adoptable Pets
        </HeaderTitle>
      </div>

      <div className="relative grid sm:grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="sticky top-28 rounded-xl border border-gray-400 h-fit md:col-span-1">
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
        <div className="h-full md:col-span-2 px-4">
          <HeaderTitle className="max-w-full mt-4 max-md:text-3xl">
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
