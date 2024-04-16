"use client"

import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("q")?.toString() || "",
  )
  const [filterType, setFilterType] = useState(
    searchParams.get("type")?.toString() || "post",
  )
  const [viewFollowingPosts, setFollowingPosts] = useState(
    searchParams.get("following")?.toString() === "true" || false,
  )

  useEffect(() => {
    if (!searchParams.get("type")) {
      const params = new URLSearchParams()
      params.set("type", "post")
      router.replace(`${pathname}?${params.toString()}`)
    }
  }, [searchParams, pathname, router])

  const handleSearch = useDebouncedCallback(
    (term: string, type: string = "post", following: boolean) => {
      const params = new URLSearchParams()
      if (term) {
        params.set("q", term)
      }
      params.set("type", type)
      if (following) {
        params.set("following", "true")
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    300,
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    handleSearch(e.target.value, filterType, viewFollowingPosts)
  }

  const handleFilterChange = (value: string) => {
    setFilterType(value)
    handleSearch(searchTerm, value, viewFollowingPosts)
  }

  const clearSearch = () => {
    setSearchTerm("")
    handleSearch("", filterType, viewFollowingPosts)
  }

  return (
    <div className="flex flex-row space-x-2 items-center">
      <div className="flex flex-row items-center">
        <div className="relative flex grow items-center bg-white rounded-md">
          <Input
            type="text"
            placeholder="Search..."
            className="pr-20 py-2 grow bg-white outline-none rounded-md"
            value={searchTerm}
            onChange={handleInputChange}
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
      <Select
        value={searchParams.get("type")?.toString()}
        onValueChange={handleFilterChange}
        defaultValue="post"
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="post">Pet posts</SelectItem>
          <SelectItem value="petSitting">Pet sittings</SelectItem>
          <SelectItem value="users">Users</SelectItem>
        </SelectContent>
      </Select>
      {(filterType === "post" || filterType === "petSitting") && (
        <>
          <Switch
            checked={searchParams.get("following")?.toString() === "true"}
            onCheckedChange={(value) => {
              setFollowingPosts(value)
              handleSearch(searchTerm, filterType, value)
            }}
          />
          <p className="text-[11px] whitespace-nowrap">See followings only</p>
        </>
      )}
    </div>
  )
}

export default SearchBar
