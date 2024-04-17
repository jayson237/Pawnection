"use client"

import { LostPetReport } from "@prisma/client"
import { FoundPetReport } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
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
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs"

const Profile = ({
  user,
  isProfileOwner,
  currentUser,
}: {
  user: SafeUser
  isProfileOwner: boolean
  currentUser: SafeUser
}) => {
  const [reports, setReports] = useState<
    FoundPetReport[] | LostPetReport[] | null
  >(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [reportActivity, setReportActivity] = useState<null | boolean>(null)
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

  const transformImage = (url: string) => {
    const parts = url.split("/upload/")
    const transformationString = "w_200,h_200,c_thumb,g_face,r_max,f_auto/"
    return `${parts[0]}/upload/${transformationString}${parts[1]}`
  }

  const router = useRouter()

  const handleLostPetReportClick = (reportId: string) => {
    router.push(`/lostAndFound/losses/${reportId}`)
  }

  const handleFoundPetReportClick = (reportId: string) => {
    router.push(`/lostAndFound/founds/${reportId}`)
  }
  const handleReportClick = (report: LostPetReport | FoundPetReport) => {
    if ("lastSeenArea" in report) {
      handleLostPetReportClick(report.id)
    } else if ("foundArea" in report) {
      handleFoundPetReportClick(report.id)
    }
  }

  const fetchReports = async (animalType: string) => {
    const url1 = "/api/lostAndFound/getLostPetReports?type=".concat(animalType)
    const url2 = "/api/lostAndFound/getFoundPetReports?type=".concat(animalType)

    const response1 = await fetch(url1)
    const response2 = await fetch(url2)
    if (!response1.ok) {
      throw new Error("Failed to fetch Lost Pet Reports")
    }

    if (!response2.ok) {
      throw new Error("Failed to fetch Found Pet Reports")
    }    

    const data1 = await response1.json()

    const data2 = await response2.json()

    if (data1 == null && data2 != null) {
      setReports(data2)
    }

    if (data1!= null && data2 == null) {
      setReports(data1)
    }

    if (data1 !=null && data2 !=null) {
      const returnedData = [...data1, ...data2]
      setReports(returnedData)
    }
    
    if (data1 == null && data2 == null) {
      setReports(null)
    }
  }  

  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-8 py-[60px]">
          <div className="flex flex-col items-center space-y-4">
            <Image
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-primary"
              src={user?.image ? user.image : "/../icon.png"}
              width={160}
              height={160}
              alt="Bordered avatar"
            />
            <div className="border rounded-xl px-1.5 py-1 text-sm w-fit ">
              {user?.type === "PetAdoptionCentre" && "Adoption Centre"}
            </div>
          </div>

          <div className="col-span-5">
            <div className="flex gap-8 mb-2 items-center">
              <HeaderTitle className="break-words text-left ml-4 w-[230px] ">
                {user.username}
              </HeaderTitle>
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

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="hover:bg-transparent"
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
                              following.image ? following.image : "/../icon.png"
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
                  className="hover:bg-transparent"
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
                              follower.image ? follower.image : "/../icon.png"
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

            <p className="ml-4 text-sm py-2">{currentUser?.bio}</p>
          </div>
        </div>
      </div>

      <div>
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
            <TabsTrigger
              value="reports"
              className="text-base py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:shadow-none"
            >
              Reports
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

          <TabsContent value="reports" className="w-full h-full pt-16">
        <div className="flex flex-row space-x-4">

        <div className="flex items-center">
          <Select
              onValueChange={(val) => {
                setReportActivity(val === "Active" ? true : val === "Inactive" ? false : null)
              }}              
          >
            <SelectTrigger className="w-[180px] px-4 py-2 h-[40px]">
              <SelectValue placeholder="Filter Report Type" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="All">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center">
          <Select
            onValueChange={(val) => {
              const fetchData = async () => {
                fetchReports(val)
              }
              fetchData()
            }}            
          >
            <SelectTrigger className="w-[180px] px-4 py-2 h-[40px]">
              <SelectValue placeholder="Filter Animal Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All </SelectItem>
              <SelectItem value="Dog">Dog</SelectItem>
              <SelectItem value="Cat">Cat</SelectItem>
              <SelectItem value="Bird">Bird</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center">
            <input
              type="text"
              placeholder="Search reports..."
              className="border px-4 py-2 w-[180px] h-[40px] rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
              {reports == null
                ? "No Reports Available"
                : reports.filter(report => {
                  const commonMatches = report.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    report.animalType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    report.animalBreed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    report.contactDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    report.petSex.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    report.reportMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    report.reportDescription.toLowerCase().includes(searchTerm.toLowerCase())
                
                  const areaMatches = "foundArea" in report ?
                    report.foundArea.toLowerCase().includes(searchTerm.toLowerCase()) :
                    report.lastSeenArea.toLowerCase().includes(searchTerm.toLowerCase())
                
                  const matchesActivityStatus = reportActivity === null || report.isActive === reportActivity
                
                  return commonMatches && areaMatches && matchesActivityStatus
                }).map((report) => (
                    <div
                      key={report.id}
                      className={report.isActive ? "flex items-center border p-4 rounded-xl bg-white h-full cursor-pointer" 
                  : "flex items-center border border-white p-4 rounded-xl bg-gray-500/40 h-full  cursor-pointer"} 

                      onClick={() => handleReportClick(report)}
                    >
                      <Image
                        className="w-24 h-24 rounded-full mr-4"
                        src={transformImage(report.imageUrl)}
                        width={80}
                        height={80}
                        alt="Bordered avatar"
                      />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      Name: {report.petName}
                    </h3>
                    <p className="text-sm mb-2 text-mainAccent">
                      {report.animalType}
                    </p>
                    <p className="text-sm mb-2">
                        {"foundArea" in report
                          ? "Report Type: Found Pet Report"
                          : "Report Type: Missing Pet Report"}
                      </p>                    
                    <p className="text-sm mb-2">Description: {report.reportDescription}</p>
                    <p className="text-sm mb-3 text-gray-500">Status: {report.isActive ? "Active" : "Inactive"}</p>
                  </div>
                    </div>
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
