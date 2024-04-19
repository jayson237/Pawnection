"use client"

import { fetcher } from "@/lib/utils"
import { SafeUser } from "@/types"
import { AdoptablePet } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import useSWR from "swr"

import Loading from "../../Loading"
import { TabsContent } from "../../ui/Tabs"

interface ProfileAdoptablePetsTabInterface {
  user: SafeUser
  isProfileOwner: boolean
  currentUser: SafeUser
}

function ProfileAdoptablePetsTab({
  user,
  isProfileOwner,
  currentUser,
}: ProfileAdoptablePetsTabInterface) {
  const { data: adoptablePets, isLoading } = useSWR<{ data: AdoptablePet[] }>(
    `/api/adoptionCenter/by/${user.id}`,
    fetcher,
  )

  if (isLoading) {
    return (
      <TabsContent value="adoptablepets">
        <div className="flex justify-center w-full py-4">
          <Loading />
        </div>
      </TabsContent>
    )
  }

  const pets = adoptablePets?.data ?? []

  return (
    <TabsContent value="adoptablepets" className="w-full h-full pt-16 px-8">
      {pets.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 w-full">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-lg shadow-md">
                {isProfileOwner || currentUser.type === "PetLover" ? (
                  <Link
                    href={
                      isProfileOwner
                        ? "/adoptionCenter/manage/" + pet.id
                        : "/adopt/requests/" + pet.id
                    }
                    key={pet.id}
                    className="bg-white rounded-lg shadow-md"
                  >
                    <Image
                      width={400}
                      height={400}
                      src={pet.imageUrl}
                      alt={pet.name}
                      className="w-full h-[200px] object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-bold">{pet.name}</h2>
                      <p className="text-orange-500 capitalize">{pet.type}</p>
                      <p className="text-gray-500">{pet.age} years old</p>
                      <div className="mt-4 border rounded-xl px-1.5 py-1 flex items-center text-sm w-fit">
                        {pet.status === "Adopted" ? (
                          <p className="text-red-500 font-semibold">Adopted</p>
                        ) : (
                          <p className="text-green-500 font-semibold">
                            Available
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div>
                    <Image
                      width={400}
                      height={400}
                      src={pet.imageUrl}
                      alt={pet.name}
                      className="w-full h-[200px] object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-bold">{pet.name}</h2>
                      <p className="text-orange-500 capitalize">{pet.type}</p>
                      <p className="text-gray-500">{pet.age} years old</p>
                      <div className="mt-4 border rounded-xl px-1.5 py-1 flex items-center text-sm w-fit">
                        {pet.status === "Adopted" ? (
                          <p className="text-red-500 font-semibold">Adopted</p>
                        ) : (
                          <p className="text-green-500 font-semibold">
                            Available
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center text-center">
              <p>No result found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="col-span-full flex justify-center items-center text-center">
          <p>No result found</p>
        </div>
      )}
    </TabsContent>
  )
}

export default ProfileAdoptablePetsTab
