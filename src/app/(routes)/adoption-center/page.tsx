import getCurrentUser from "@/lib/actions/getCurrentUser"
import { UserType } from "@prisma/client"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"

import HeaderTitle from "../../../components/HeaderTitle"
import OwnAdoptablePost from "../../../components/adoption/OwnAdoptablePost"
import { buttonVariants } from "../../../components/ui/Button"
import { cn } from "../../../lib/utils"

export default async function AdoptionCenterPage() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  if (currUser.type !== UserType.PetAdoptionCentre) redirect("/adopt")
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px]">
        <div className="mx-auto flex flex-col items-center">
          <HeaderTitle description="Browse through the profiles and find your new furry friend!">
            Manage your Pet Adoption listing here
          </HeaderTitle>
          <Link
            className={cn(buttonVariants({ variant: "default" }), "mt-4")}
            href="/adoption-center/post"
          >
            Post a Pet
          </Link>
        </div>
      </div>

      <div className="py-[60px]">
        <div className="mx-auto flex flex-col items-center space-y-6">
          <HeaderTitle>Your Pet Postings</HeaderTitle>

          <OwnAdoptablePost />
        </div>
      </div>
    </div>
  )
}
