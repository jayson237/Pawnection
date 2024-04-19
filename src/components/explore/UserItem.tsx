"use client"

import { User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "../ui/Button"

const UserItem = ({
  user,
  isOwnProfile,
  isCurrentFollowed,
}: {
  user: User
  isOwnProfile: boolean
  isCurrentFollowed: boolean
}) => {
  const [isCurrentFollowedState, setIsCurrentFollowedState] = useState<
    boolean | null | undefined
  >(isCurrentFollowed)

  const handleUnfollow = async () => {
    await fetch("/api/user/unfollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
      }),
    })
    setIsCurrentFollowedState(false)
  }

  const handleFollow = async () => {
    await fetch("/api/user/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
      }),
    })
    setIsCurrentFollowedState(true)
  }

  return (
    <div className="flex rounded-xl border w-[409px] bg-white px-8 py-8 items-center justify-between">
      <Link href={`/profile/${user.username}`} target="_blank">
        <div className="flex flex-row items-center transition-all duration-300 ease-in-out hover:cursor-pointer hover:opacity-80">
          <Image
            src={
              !user?.image
                ? "/icon.png"
                : user?.image.split("image/upload")[0].includes("cloudinary")
                  ? `${
                      user?.image?.split("/image/upload/")[0]
                    }/image/upload/c_fill,h_160,w_160/${
                      user?.image?.split("/image/upload/")[1]
                    }`
                  : user?.image
            }
            width={160}
            height={160}
            alt={user.username || "User image"}
            className="rounded-full h-10 w-10 mr-3"
          />
          <div className="flex flex-col space-y-1">
            <span className="font-bold">{user.username}</span>
            {user?.type === "PetAdoptionCentre" && (
              <div className="border rounded-xl px-1.5 py-1 text-sm w-fit ">
                Adoption Centre
              </div>
            )}
          </div>
        </div>
      </Link>
      {!isOwnProfile &&
        (isCurrentFollowedState ? (
          <Button
            variant="outline"
            className="w-20"
            size={"sm"}
            onClick={handleUnfollow}
          >
            Unfollow
          </Button>
        ) : (
          <Button className="w-20" size={"sm"} onClick={handleFollow}>
            Follow
          </Button>
        ))}
    </div>
  )
}

export default UserItem
