"use client"

import { SafeUser } from "@/types"
import { FoundPetReport, LostPetReport, UserType } from "@prisma/client"
import React from "react"

import { Tabs, TabsList, TabsTrigger } from "../../ui/Tabs"
import ProfileAdoptablePetsTab from "./AdoptablePets"
import ProfilePostsTab from "./ProfilePosts"
import ProfileReportsTab from "./Reports"

interface ProfileTabsInterface {
  reports:
    | (FoundPetReport & { type: string })[]
    | (LostPetReport & { type: string })[]
    | null
  user: SafeUser
  currentUser: SafeUser
  isProfileOwner: boolean
}

function ProfileTabs({
  reports,
  user,
  currentUser,
  isProfileOwner,
}: ProfileTabsInterface) {
  return (
    <Tabs defaultValue="posts">
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

      <ProfilePostsTab user={user} currentUser={currentUser} />

      {user.type === UserType.PetAdoptionCentre && (
        <ProfileAdoptablePetsTab user={user} isProfileOwner={isProfileOwner} currentUser={currentUser}/>
      )}

      <ProfileReportsTab reports={reports} />
    </Tabs>
  )
}

export default ProfileTabs
