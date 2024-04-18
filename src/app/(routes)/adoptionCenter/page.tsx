import HeaderTitle from "@/components/HeaderTitle"
import AdoptionCenter from "@/components/adoptionCenter/AdoptionCenterPage"
import { buttonVariants } from "@/components/ui/Button"
import { getCurrentUser } from "@/lib/actions/user"
import { cn } from "@/lib/utils"
import { UserType } from "@prisma/client"
import { HeartHandshake } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"

export default async function AdoptionCenterPage() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (!currUser?.type) redirect("/auth/type")
  if (currUser.type !== UserType.PetAdoptionCentre) redirect("/adopt")
  return (
    <div className="w-full max-w-[1240px] mx-auto sm:px-8 px-8">
      <div className="md:py-[30px] lg:py-[40px]">
        <div className="flex mx-auto flex-col items-center space-y-12">
          <div className="flex flex-col space-y-4 items-center">
            <HeaderTitle className="max-md:text-2xl">
              {currUser.username} adoption center
            </HeaderTitle>
            <Link
              className={cn(
                buttonVariants({
                  variant: "default",
                  className: "w-fit px-8 bg-mainAccent hover:bg-mainAccent/90",
                }),
              )}
              href="/adoptionCenter/post"
            >
              <HeartHandshake className="w-4 h-4 mr-2" />
              Create adoption listing
            </Link>
          </div>
          <AdoptionCenter />
        </div>
      </div>
    </div>
  )
}
