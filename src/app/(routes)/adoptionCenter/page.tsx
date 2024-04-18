import HeaderTitle from "@/components/HeaderTitle"
import OwnAdoptablePost from "@/components/adoptionCenter/OwnAdoptablePost"
import { buttonVariants } from "@/components/ui/Button"
import { getCurrentUser } from "@/lib/actions/user"
import { cn } from "@/lib/utils"
import { UserType } from "@prisma/client"
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
      <div className="py-[30px] px-[15px] sm:py-[50px]">
        <div className="mx-auto flex flex-col items-center">
          <HeaderTitle
            className="max-w-[fit-content] mx-auto text-center max-md:text-2xl"
            descriptionClassName="max-md:text-lg"
            description="Browse through the profiles and find your new furry friend!"
          >
            Manage your Pet Adoption listing here
          </HeaderTitle>
          <Link
            className={cn(buttonVariants({ variant: "default" }), "mt-4")}
            href="/adoptionCenter/post"
          >
            Post a Pet
          </Link>
        </div>
      </div>

      <div className="md:py-[30px] lg:py-[40px]">
        <div className="mx-auto flex flex-col items-center space-y-10">
          <HeaderTitle className="max-md:text-2xl">
            Your Pet Postings
          </HeaderTitle>
          <OwnAdoptablePost />
        </div>
      </div>
    </div>
  )
}
