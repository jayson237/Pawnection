"use client"

import HeaderTitle from "@/components/HeaderTitle"
import HowToAdopt from "@/components/adopt/HowToAdopt"
import { buttonVariants } from "@/components/ui/Button"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import { AdoptablePet } from "@prisma/client"
import { Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import React, { useState } from "react"

import Loading from "../Loading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"

const AdoptPost = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("")
  const [adoptablePets, setAdoptablePets] = useState<AdoptablePet[] | null>(
    null,
  )

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch("/api/adopt")
      .then((response) => response.json())
      .then((data) => {
        setAdoptablePets(data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }, [])

  const searchedPets = adoptablePets
    ? adoptablePets.filter((pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const filteredPets =
    searchedPets &&
    searchedPets.filter((pet) => {
      if (!filter || filter === "All") return true
      return pet.type.toLowerCase() === filter.toLowerCase()
    })

  const clearSearch = () => {
    setSearchTerm("")
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-8">
      <div className="flex flex-col items-center py-[45px] space-y-2 w-full">
        <HeaderTitle className="max-w-full">Adoptable Pets</HeaderTitle>
        <div className="flex items-center justify-center space-x-2 mb-6 mr-6">
          <HowToAdopt />
        </div>
      </div>

      <div className="flex-row justify-center space-y-4 space-x-2 mb-8 px-4 sm:px-0">
        <div className="flex flex-row space-x-2 justify-center">
          <Select onValueChange={handleFilterChange} defaultValue="All">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select Animal Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Dog">Dog</SelectItem>
              <SelectItem value="Cat">Cat</SelectItem>
              <SelectItem value="Bird">Bird</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-row items-center justify-center">
            <div className="relative flex grow items-center justify-center bg-white rounded-md">
              <Input
                type="text"
                placeholder="Search..."
                className="pr-20 py-2 grow bg-white outline-none rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm.length !== 0 && (
                <Button
                  onClick={clearSearch}
                  className="absolute right-8"
                  variant="search"
                >
                  <X className="text-gray-500 hover:text-primary duration-300 ease-in-out transition-all w-5 h-5" />
                </Button>
              )}
              <Button className="absolute right-2 pr-2" variant="search">
                <Search className="text-gray-500 w-5 h-5" />
              </Button>
            </div>
          </div>
          <Link
            className={cn(
              buttonVariants({ variant: "default" }),
              "px-2 sm:px-4 py-2 ml-3 sm:ml-6",
            )}
            href="/adopt/requests"
          >
            View all requests
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : filteredPets !== null && filteredPets.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
          {filteredPets.map((pet) => (
            <Link
              href={
                pet.status === "Adopted" ? "#" : `/adopt/requests/${pet.id}`
              }
              key={pet.id}
              className={cn(
                "bg-white rounded-lg shadow-md",
                pet.status === "Adopted" && "opacity-80",
              )}
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
                    <p className="text-green-500 font-semibold">Available</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center">No results found</div>
      )}
    </div>
  )
}

export default AdoptPost
