"use client"

import { Search, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useQueryState } from "nuqs"
import { ChangeEvent, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import { Switch } from "../ui/Switch"

const SearchBar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [query, setQuery] = useQueryState("q", {
    defaultValue: "",
    throttleMs: 500,
  })
  const [following, setFollowing] = useQueryState("following", {
    defaultValue: "",
  })
  const [viewSearch, setViewSearch] = useState(query || "")
  const exploreType = pathname.split("/")[2]

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    250,
  )

  const handleFilterChange = (value: string) => {
    console.log("udin")

    router.replace(
      `/explore/${value}?${new URLSearchParams({
        q: query,
      }).toString()}`,
    )
  }

  const clearSearch = () => {
    setViewSearch("")
    setQuery("")
  }

  return (
    <div className="flex flex-row space-x-2 px-4 items-center">
      <div className="flex flex-row items-center">
        <div className="relative flex grow items-center bg-white rounded-md">
          <Input
            type="text"
            placeholder="Search..."
            className="pr-20 py-2 grow bg-white outline-none rounded-md"
            value={viewSearch}
            onChange={(event) => {
              setViewSearch(event.target.value)
              handleSearch(event)
            }}
          />
          {viewSearch.length !== 0 && (
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
      <Select
        value={exploreType}
        onValueChange={handleFilterChange}
        defaultValue="post"
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="post"> Pet posts</SelectItem>
          <SelectItem value="pet-sitting">Pet sittings</SelectItem>
          <SelectItem value="users">Users</SelectItem>
        </SelectContent>
      </Select>
      {exploreType !== "users" && (
        <>
          <Switch
            checked={following === "true"}
            onCheckedChange={(value) => {
              setFollowing(value ? "true" : "")
            }}
          />
          <p className="text-[11px]">See followings only</p>
        </>
      )}
    </div>
  )
}

export default SearchBar
