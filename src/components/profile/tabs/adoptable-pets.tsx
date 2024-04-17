"use client"

import { fetcher } from "@/lib/utils"
import { SafeUser } from "@/types"
import { AdoptablePet } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import useSWR from "swr"

import Loading from "../../Loading"
import { Label } from "../../ui/Label"
import { TabsContent } from "../../ui/Tabs"

interface ProfileAdoptablePetsTabInterface {
  user: SafeUser
}

function ProfileAdoptablePetsTab({ user }: ProfileAdoptablePetsTabInterface) {
  const { data: adoptablePets, isLoading } = useSWR<{ data: AdoptablePet[] }>(
    `/api/adoptionCenter/by/${user.id}`,
    fetcher,
  )

  if (isLoading) {
    return (
      <TabsContent value="adoptablepets">
        <div className="flex justify-center py-4">
          <Loading />
        </div>
      </TabsContent>
    )
  }

  const pets = adoptablePets?.data ?? []

  return (
    <TabsContent value="adoptablepets" className="w-full h-full pt-16 px-8">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 w-full">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <Link
              href={"/adopt/process/" + pet.id}
              key={pet.id}
              className="bg-white rounded-lg shadow-md"
            >
              <Image
                width={200}
                height={200}
                src={pet.imageUrl}
                alt={pet.name}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{pet.name}</h2>
                <p className="text-gray-500">{pet.breed}</p>
                <p className="text-gray-500">{pet.age} years old</p>
                {pet.status === "Adopted" ? (
                  <Label className="text-red-500">Adopted</Label>
                ) : (
                  <Label>Available</Label>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="py-4 text-center">No results found</p>
        )}
      </div>
    </TabsContent>
  )
}

export default ProfileAdoptablePetsTab
