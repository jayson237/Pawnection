"use client"

import { PetGender } from "@/types"
import Image from "next/image"

function FeaturedCard({
  imagePath,
  petName,
  petGender,
  petAge,
}: {
  imagePath: string
  petName: string
  petGender: PetGender
  petAge: string
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Image
        src={imagePath}
        className="h-full bg-cover bg-center border border-gray-200 object-cover max-h-[240px] w-[240px]"
        width={240}
        height={240}
        alt="featured1"
      />

      <div className="p-3 space-y-1">
        <h4 className="">{petName}</h4>
        <p className="text-xl">
          {petGender}, {petAge} {Number.parseInt(petAge) > 1 ? "years" : "year"}{" "}
          old
        </p>
      </div>
    </div>
  )
}

export default FeaturedCard
