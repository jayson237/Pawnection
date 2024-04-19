"use client"

import { Info } from "lucide-react"

import HeaderTitle from "../HeaderTitle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/Dialog"
import HowtoCard from "./HowToCard"

const HowToAdopt = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center space-x-2 flex-row cursor-pointer">
            <Info className="w-4 h-4 text-orange-500" />
            <p className="text-md text-orange-500 font-semibold">
              How to Adopt
            </p>
          </div>
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

export default HowToAdopt
