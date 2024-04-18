"use client"

import { Button, buttonVariants } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { cn } from "@/lib/utils"
import { AdoptablePet } from "@prisma/client"
import { Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, useState } from "react"

import { Input } from "../ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import InformationIcon from "./InformationIcon"

const AdoptSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("")

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    // const term = event.target.value;
    // setSearchTerm(term);
    // const filtered = adoptablePets.filter(pet =>
    //   pet.name.toLowerCase().includes(term.toLowerCase())
    // );
    // setSearchedPets(filtered);
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <>
      <div className="flex flex-row space-x-2 justify-start">
        <Select value={filter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="post">Bird</SelectItem>
            <SelectItem value="pet-sitting">Cat</SelectItem>
            <SelectItem value="users">Dog</SelectItem>
            <SelectItem value="users">Fish</SelectItem>
            <SelectItem value="users">Hamster</SelectItem>
            <SelectItem value="users">Lizard</SelectItem>
            <SelectItem value="users">Rabbit</SelectItem>
            <SelectItem value="users">Turtle</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-row items-center justify-start">
          <div className="relative flex grow items-center justify-start bg-white rounded-md">
            <Input
              type="text"
              placeholder="Search..."
              className="pr-20 py-2 grow bg-white outline-none rounded-md"
              value={searchTerm}
              onChange={handleSearch}
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
          View all your requests
        </Link>

        <InformationIcon />
      </div>
    </>
  )
}

export default AdoptSearchBar
