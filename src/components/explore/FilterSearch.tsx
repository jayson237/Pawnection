"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Search, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"

const searchSchema = z.object({
  searchTerm: z.string(),
  filter: z.string(),
})

const FilterSearch = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isLoading },
    setValue,
    watch,
    reset,
  } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
      filter: "post",
    },
  })

  const onSubmit = async (data: z.infer<typeof searchSchema>) => {
    console.log(data)
  }

  return (
    <div className="flex flex-row items-center space-x-2">
      <form
        className="flex grow flex-row items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative flex grow items-center bg-white rounded-md">
          <Input
            {...register("searchTerm")}
            type="text"
            placeholder="Search..."
            className="pr-20 py-2 grow bg-white outline-none rounded-md"
          />

          {watch("searchTerm").length !== 0 && (
            <Button
              onClick={() => setValue("searchTerm", "")}
              className="absolute right-8"
              variant="search"
            >
              <X className="text-gray-500 hover:text-primary duration-300 ease-in-out transition-all w-5 h-5" />
            </Button>
          )}

          <Button
            type="submit"
            className="absolute right-2 pr-2"
            variant="search"
          >
            <Search className="text-gray-500 hover:text-primary duration-300 ease-in-out transition-all w-5 h-5" />
          </Button>
        </div>
      </form>
      <Select
        onValueChange={(val) => setValue("filter", val)}
        defaultValue={watch("filter")}
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
    </div>
  )
}

export default FilterSearch
