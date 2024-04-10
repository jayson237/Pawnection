"use client"

import { FoundPetReport, LostPetReport, UserType } from "@prisma/client"
import Image from "next/image"
import React from "react"

import { SafeUser } from "../../../types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/Tabs"
import ProfileReportsTab from "./Reports"
import ProfileAdoptablePetsTab from "./adoptable-pets"
import ProfilePostsTab from "./posts"

interface ProfileTabsInterface {
  reports: FoundPetReport[] | LostPetReport[] | null
  user: SafeUser
}

function ProfileTabs({ reports, user }: ProfileTabsInterface) {
  return (
    <Tabs defaultValue="posts" className="">
      <TabsList className="bg-transparent w-full gap-8 h-18">
        <TabsTrigger
          value="posts"
          className="text-base py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:shadow-none"
        >
          Posts
        </TabsTrigger>
        {user.type === UserType.PetAdoptionCentre && (
          <TabsTrigger
            value="adoptablepets"
            className="text-base py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:shadow-none"
          >
            Adoptable Pets
          </TabsTrigger>
        )}
        <TabsTrigger
          value="reports"
          className="text-base py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:shadow-none"
        >
          Reports
        </TabsTrigger>
      </TabsList>

      <ProfilePostsTab user={user} />

      <ProfileAdoptablePetsTab user={user} />

      <ProfileReportsTab reports={reports} />
    </Tabs>
  )
}

export default ProfileTabs
