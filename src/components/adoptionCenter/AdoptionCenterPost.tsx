"use client"

import { buttonVariants } from "@/components/ui/Button"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import { AdoptablePet } from "@prisma/client"
import { Search, X } from "lucide-react"
import { HeartHandshake } from "lucide-react"
import Image from "next/legacy/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import Loading from "../Loading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"

function AdoptionCenterPost() {
  const [data, setData] = useState<AdoptablePet[] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch("/api/adoptionCenter")
      .then((response) => response.json())
      .then((data) => {
        setData(data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }, [])

  const searchedData = data
    ? data.filter((pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const filteredData =
    searchedData &&
    searchedData.filter((pet) => {
      if (!filter || filter === "All") return true
      return pet.type.toLowerCase() === filter.toLowerCase()
    })

  const handleFilterChange = (value: string) => {
    setFilter(value)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <>
      <div className="flex flex-row space-x-2 items-center justify-center mb-6">
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
        <div className="relative flex items-center justify-center bg-white rounded-md">
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
        <Link
          className={cn(
            buttonVariants({
              variant: "default",

              className: "w-fit bg-mainAccent hover:bg-mainAccent/90",
            }),
          )}
          href="/adoptionCenter/post"
        >
          <HeartHandshake className="w-4 h-4 mr-2" />
          Create adoption listing
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : filteredData.length > 0 ? (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 sm:gap-6 lg:gap-7 w-full">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-white flex flex-col shadow-lg"
            >
              <div className="w-full relative" style={{ paddingTop: "70%" }}>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
              <div className="px-3.5 py-4">
                <h4 className="font-bold text-lg">{item.name}</h4>
                <p>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)} |{" "}
                  {item.gender} | {item.age} y.o.
                </p>
                <Link
                  href={`/adoptionCenter/manage/${item.id}`}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "mt-4 w-full",
                  )}
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center mt-4">No results found</div>
      )}
    </>
  )
}

export default AdoptionCenterPost
