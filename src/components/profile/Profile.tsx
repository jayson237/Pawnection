"use client"

import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { SafeUser } from "../../types"
import HeaderTitle from "../HeaderTitle"
import { AlertDialogTitle, AlertDialogTrigger } from "../ui/AlertDialog"
import { Button } from "../ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import LoadingDots from "../ui/LoadingDots"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs"

type TabType = "posts" | "about"

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
            alt="Bordered avatar"
          />

          <div className="col-span-5">
            <div className="flex gap-8">
              <HeaderTitle className="text-left">{user.username}</HeaderTitle>
              {!isProfileOwner ? (
                !user.isCurrentFollowed ? (
                  <Button
                    onClick={async () => {
                      await fetch("/api/user/follow", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: user.username }),
                      })
                    }}
                  >
                    Follow
                  </Button>
                ) : (
                  <Button
                    onClick={async () => {
                      await fetch("/api/user/unfollow", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: user.username }),
                      })
                    }}
                    variant="outline"
                  >
                    Unfollow
                  </Button>
                )
              ) : null}
            </div>
            <div className="mt-4 border rounded-xl px-1.5 py-1 flex space-x-2 items-center text-sm w-fit">
              <p className="text-center">Account type:</p>
              <p className="w-fit rounded-lg bg-orange-300 px-1 py-0.25 text-center">
                {user?.type}
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" disabled={!currentUser}>
                  {user.following?.length} following
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogDescription>Following</DialogDescription>
                </DialogHeader>
                <div className="space-y-1">
                  {user.following && user.following.length > 0 ? (
                    user.following?.map((following) => (
                      <Link
                        href={`/profile/${following.username}`}
                        key={following.username}
                        className="flex items-center justify-between hover:bg-gray-200/20 p-2 rounded-lg transition-all duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            className="object-cover w-10 h-10 rounded-full"
                            src={
                              following.image
                                ? following.image
                                : "/../../icon.png"
                            }
                            width={40}
                            height={40}
                            alt="Bordered avatar"
                          />
                          <p>{following.username}</p>
                        </div>
                        {!(following.username === currentUser?.username) ? (
                          !following.isCurrentFollowed ? (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={async () => {
                                await fetch("/api/user/follow", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    username: following.username,
                                  }),
                                })
                              }}
                            >
                              Follow
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={async () => {
                                await fetch("/api/user/unfollow", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    username: following.username,
                                  }),
                                })
                              }}
                            >
                              Unfollow
                            </Button>
                          )
                        ) : null}
                      </Link>
                    ))
                  ) : (
                    <p className="text-center">No following</p>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" disabled={!currentUser}>
                  {user.followers?.length} followers
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogDescription>Followers</DialogDescription>
                </DialogHeader>
                <div className="space-y-1">
                  {user.followers && user.followers.length > 0 ? (
                    user.followers?.map((follower) => (
                      <Link
                        href={`/profile/${follower.username}`}
                        key={follower.username}
                        className="flex items-center justify-between hover:bg-gray-200/20 p-2 rounded-lg transition-all duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            className="object-cover w-10 h-10 rounded-full"
                            src={
                              follower.image
                                ? follower.image
                                : "/../../icon.png"
                            }
                            width={40}
                            height={40}
                            alt="Bordered avatar"
                          />
                          <p>{follower.username}</p>
                        </div>
                        {!(follower.username === currentUser?.username) ? (
                          !follower.isCurrentFollowed ? (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={async () => {
                                await fetch("/api/user/follow", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    username: follower.username,
                                  }),
                                })
                              }}
                            >
                              Follow
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={async () => {
                                await fetch("/api/user/unfollow", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    username: follower.username,
                                  }),
                                })
                              }}
                            >
                              Unfollow
                            </Button>
                          )
                        ) : null}
                      </Link>
                    ))
                  ) : (
                    <p className="text-center">No followers</p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="">
        <Tabs defaultValue="posts" className="">
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

          <TabsContent value="posts" className="w-full h-full pt-16">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 bg-white rounded-xl p-2"
                >
                  <Image
                    className="object-cover w-20 h-20 rounded-md"
                    src={user?.image ? user.image : "/../../icon.png"}
                    width={80}
                    height={80}
                    alt="Bordered avatar"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">Post title</p>
                    <p className="text-sm text-gray-500">Post description</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="about">Abount ??</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
