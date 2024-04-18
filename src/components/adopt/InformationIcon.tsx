"use client"

import { cn } from "@/lib/utils"
import { Info, Search, X } from "lucide-react"
import { ChangeEvent, useState } from "react"

import { Button, buttonVariants } from "../ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/Dialog"
import { Input } from "../ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import HowtoCard from "./HowToCard"
import HeaderTitle from "../HeaderTitle"

const InformationIcon = () => {
  const [showDialog, setShowDialog] = useState(false)

  const openDialog = () => setShowDialog(true)
  const closeDialog = () => setShowDialog(false)

  return (
    <>
      <Dialog onOpenChange={closeDialog}>
        <DialogTrigger asChild>
          <Button
            onClick={openDialog}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "px-4 py-2 ml-1 sm:ml-6",
            )}
          >
            <Info className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogDescription>Adoption Information</DialogDescription>
          </DialogHeader>
          <div>
            <div className="flex flex-col items-center">
              <HeaderTitle className="max-md:text-2xl">
                How to Adopt
              </HeaderTitle>
              <h3 className="text-lg text-mainAccent font-semibold leading-8 tracking-tight text-center py-3 max-md:px-4">
                Disclaimer: The following steps are conducted between the
                adoptee and the adoption agency!
              </h3>
            </div>
            <div className="gap-6 grid sm:grid-cols-2 grid-cols-1 py-2 px-4">
              <HowtoCard
                imagePath="/static/images/findpet.png"
                title="Find a Pet"
                description="Browse through the profiles and find your new furry friend!"
              />
              <HowtoCard
                imagePath="/static/images/contact.png"
                title="Contact the Agency"
                description="Reach out to the adpotion agency to enquire about the pet and arrange a meeting."
              />
              <HowtoCard
                imagePath="/static/images/meetthepet.png"
                title="Meet the Pet"
                description="Visit the agency and spend time with the pet to ensure compatibility."
              />
              <HowtoCard
                imagePath="/static/images/completeprocess.png"
                title="Complete the Adoption Process"
                description="Provide the necessary documentation and pay adoption fees to finalize the process."
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default InformationIcon
