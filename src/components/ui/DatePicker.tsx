"use client"

import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "../ui/Button"
import { Calendar } from "../ui/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover"

interface DatePickerProps {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date>>
  handleDate?: (date: Date | undefined) => void;
}

export function DatePicker({ date, setDate, handleDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate != null) {
              setDate(selectedDate)
              handleDate?.(selectedDate)
            } else {
              handleDate?.(undefined)
            }
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  )
}
