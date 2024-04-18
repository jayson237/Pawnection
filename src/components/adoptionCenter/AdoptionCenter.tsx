"use client"

import HeaderTitle from "@/components/HeaderTitle"
import OwnAdoptablePost from "@/components/adoptionCenter/OwnAdoptablePost"
import { buttonVariants } from "@/components/ui/Button"
import { getCurrentUser } from "@/lib/actions/user"
import { cn } from "@/lib/utils"
import { SafeUser } from "@/types"
import { User, UserType } from "@prisma/client"
import { HeartHandshake } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"

const AdoptionCenter = ({ currUser }: { currUser?: SafeUser | null }) => {
  return (
    <div className="w-full max-w-[1240px] mx-auto sm:px-8 px-8">
      <div className="md:py-[30px] lg:py-[40px]">
        <div className="flex mx-auto flex-col items-center space-y-12">
          <div className="flex flex-col space-y-4 items-center">
            <HeaderTitle className="max-md:text-2xl">
              {currUser?.username ?? "User"} adoption center
            </HeaderTitle>
            
          </div>
          <OwnAdoptablePost />
        </div>
      </div>
    </div>
  )
}

export default AdoptionCenter
