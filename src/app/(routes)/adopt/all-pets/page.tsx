import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"

import HeaderTitle from "../../../../components/HeaderTitle"
import { getAllAdoptablePets } from "../../../../lib/api/adopt"

export default async function AdoptViewAllPetsPage() {
  const adoptablePets = await getAllAdoptablePets()
  console.log(adoptablePets)

  if (!adoptablePets) {
    return notFound()
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px] w-full">
        <HeaderTitle className="max-w-full">Adoptable Pets</HeaderTitle>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 w-full">
        {adoptablePets.map((pet) => (
          <Link
            href={"/adopt/process/" + pet.id}
            key={pet.id}
            className="bg-white rounded-lg shadow-md"
          >
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{pet.name}</h2>
              <p className="text-gray-500">{pet.breed}</p>
              <p className="text-gray-500">{pet.age} years old</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
