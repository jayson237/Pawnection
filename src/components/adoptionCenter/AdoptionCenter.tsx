"use client"

import HeaderTitle from "@/components/HeaderTitle"
import AdoptionCenterPost from "@/components/adoptionCenter/AdoptionCenterPost"
import { SafeUser } from "@/types"
import React from "react"

const AdoptionCenter = ({ currUser }: { currUser?: SafeUser | null }) => {
  return (
    <div className="w-full max-w-[1240px] mx-auto sm:px-8 px-8">
      <div className="md:py-[30px] lg:py-[60px]">
        <div className="flex mx-auto flex-col items-center mb-12">
          <HeaderTitle className="max-md:text-2xl">
            {currUser?.username ?? "My"} adoption center
          </HeaderTitle>
        </div>
        <AdoptionCenterPost />
      </div>
    </div>
  )
}

export default AdoptionCenter
