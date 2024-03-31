"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"

import { FollowItemType, FollowType, SafeUser } from "@/types"
import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/Dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs"

const handleFollow = async (username: string | null) => {
  await fetch("/api/user/follow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  })
}

const handleUnfollow = async (username: string | null) => {
  await fetch("/api/user/unfollow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  })
}

const UserList = ({
  users,
  currentUser,
  label,
}: {
  users: FollowType
  currentUser: SafeUser | null
  label: string
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" disabled={!currentUser}>
        {users?.length} {label}
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogDescription>{label}</DialogDescription>
      </DialogHeader>
      <div className="space-y-1">
        {users && users.length > 0 ? (
          users.map((user) => (
            <UserLink
              key={user.username}
              user={user}
              currentUser={currentUser}
            />
          ))
        ) : (
          <p className="text-center">No {label.toLowerCase()}</p>
        )}
      </div>
    </DialogContent>
  </Dialog>
)

const UserLink = ({
  user,
  currentUser,
}: {
  user: FollowItemType
  currentUser: SafeUser | null
}) => (
  <Link
    href={`/profile/${user.username}`}
    className="flex items-center justify-between hover:bg-gray-200/20 p-2 rounded-lg transition-all duration-200"
  >
    <div className="flex items-center gap-4">
      <Image
        className="object-cover w-10 h-10 rounded-full"
        src={user.image ? user.image : "/../../icon.png"}
        width={40}
        height={40}
        alt="User avatar"
      />
      <p>{user.username}</p>
    </div>
    {!(user.username === currentUser?.username) && (
      <Button
        className="w-20"
        variant={!user.isCurrentFollowed ? "default" : "outline"}
        size="sm"
        onClick={() =>
          !user.isCurrentFollowed
            ? handleFollow(user.username)
            : handleUnfollow(user.username)
        }
      >
        {!user.isCurrentFollowed ? "Follow" : "Unfollow"}
      </Button>
    )}
  </Link>
)

const Profile = ({
  user,
  isProfileOwner,
  currentUser,
}: {
  user: SafeUser
  isProfileOwner: boolean
  currentUser: SafeUser | null
}) => {
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px]">
        <div className="grid grid-cols-6">
          <Image
            className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-primary"
            src={user?.image ? user.image : "/../../icon.png"}
            width={160}
            height={160}
            alt="User avatar"
          />

          <div className="col-span-5">
            <div className="flex gap-8">
              <HeaderTitle className="text-left">{user.username}</HeaderTitle>
              {!isProfileOwner && (
                <Button
                  variant={user.isCurrentFollowed ? "outline" : "default"}
                  onClick={() =>
                    !user.isCurrentFollowed
                      ? handleFollow(user.username)
                      : handleUnfollow(user.username)
                  }
                >
                  {user.isCurrentFollowed ? "Unfollow" : "Follow"}
                </Button>
              )}
              {isProfileOwner && (
                <Button>
                  <Link href="/settings">Edit profile</Link>
                </Button>
              )}
            </div>
            <div className="my-2 border rounded-xl px-1.5 py-1 text-sm w-fit">
              {user?.type}
            </div>

            <UserList
              users={user.following}
              currentUser={currentUser}
              label="Following"
            />
            <UserList
              users={user.followers}
              currentUser={currentUser}
              label="Followers"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="posts" className="mt-4">
        <TabsList className="bg-transparent w-full gap-8 h-18">
          <TabsTrigger
            value="posts"
            className="text-base py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:shadow-none"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="text-base py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:shadow-none"
          >
            About
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts"></TabsContent>
        <TabsContent value="about"></TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile
