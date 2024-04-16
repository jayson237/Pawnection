"use client"

import { LostPetReport } from "@prisma/client"
import { FoundPetReport } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { useEffect, useState } from "react"
import { boolean } from "zod"

import { SafeUser } from "../../types"
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
import ProfileTabs from "./tabs"

type TabType = "posts" | "about" | "reports"

const Profile = ({
  user,
  isProfileOwner,
  currentUser,
}: {
  user: SafeUser
  isProfileOwner: boolean
  currentUser: SafeUser | null
}) => {
  const [reports, setReports] = useState<
    FoundPetReport[] | LostPetReport[] | null
  >(null)

  const [isCurrentFollowed, setIsCurrentFollowed] = useState<
    boolean | null | undefined
  >(user.isCurrentFollowed)
  const [fo, setFo] = useState<{
    followerCount: number | undefined
    followingCount: number | undefined
  }>({
    followerCount: user.followers?.length,
    followingCount: user.following?.length,
  })

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/user/reports", { method: "GET" })

        if (!response.ok) {
          throw new Error("Error loading reports")
        }

        const data = await response.json()
        const typedReports = data.map(
          (report: LostPetReport | FoundPetReport) => ({
            ...report,
            type: "foundArea" in report ? "FoundPetReport" : "LostPetReport",
          }),
        )
        setReports(typedReports)
      } catch (error) {
        console.error("Failed to fetch user reports:", error)
        setReports(null)
      }
    }

    fetchReports()
  }, [])

  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-10 py-[60px]">
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
                !isCurrentFollowed ? (
                  <Button
                    onClick={async () => {
                      await fetch("/api/user/follow", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: user.username }),
                      }).then(() => {
                        setIsCurrentFollowed(true)
                        setFo((prev) => ({
                          ...prev,
                          followerCount:
                            prev.followerCount && prev.followerCount + 1,
                        }))
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
                      }).then(() => {
                        setIsCurrentFollowed(false)
                        setFo((prev) => ({
                          ...prev,
                          followerCount:
                            prev.followerCount && prev.followerCount - 1,
                        }))
                      })
                    }}
                    variant="outline"
                  >
                    Unfollow
                  </Button>
                )
              ) : null}
              {isProfileOwner && (
                <Button className="md:px-4 px-2">
                  <Link href="/settings">Edit profile</Link>
                </Button>
              )}
            </div>
            <div className="flex flex-col space-x-2">
              <div className="my-2 border rounded-xl px-1.5 py-1 text-sm w-fit">
                {user?.type}
              </div>
              <p className="mb-2 text-sm">{currentUser?.bio}</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="hover:bg-submain"
                  variant="ghost"
                  disabled={!currentUser}
                >
                  {fo.followingCount} Following
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-y-auto">
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
                                }).then(() => {
                                  setIsCurrentFollowed(true)
                                  setFo((prev) => ({
                                    ...prev,
                                    followerCount:
                                      prev.followerCount &&
                                      prev.followerCount + 1,
                                  }))
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
                                }).then(() => {
                                  setIsCurrentFollowed(false)
                                  setFo((prev) => ({
                                    ...prev,
                                    followerCount:
                                      prev.followerCount &&
                                      prev.followerCount - 1,
                                  }))
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
                <Button
                  className="hover:bg-submain"
                  variant="ghost"
                  disabled={!currentUser}
                >
                  {fo.followerCount} Follower
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-y-auto">
                <DialogHeader>
                  <DialogDescription>Follower</DialogDescription>
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
                                }).then(() => {
                                  setIsCurrentFollowed(true)
                                  setFo((prev) => ({
                                    ...prev,
                                    followerCount:
                                      prev.followerCount &&
                                      prev.followerCount + 1,
                                  }))
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
                                }).then(() => {
                                  setIsCurrentFollowed(false)
                                  setFo((prev) => ({
                                    ...prev,
                                    followerCount:
                                      prev.followerCount &&
                                      prev.followerCount - 1,
                                  }))
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

        <div>
          <ProfileTabs reports={reports} user={user} />
        </div>
      </div>
    </div>
  )
}

export default Profile
