"use client"

import { revalPath } from "@/lib/revalidate"
import { User } from "@prisma/client"
import { Post } from "@prisma/client"
import { MoreVertical } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import TimeStamp from "../TimeStamp"
import { Button } from "../ui/Button"

const PostContent = ({
  post,
  isOwnProfile,
  isCurrentFollowed,
}: {
  post: Post & { user: User }
  isOwnProfile: boolean
  isCurrentFollowed: boolean
}) => {
  const time = new Date(post.createdAt).toISOString()
  return (
    <div className="rounded-xl border bg-white h-full max-w-xl">
      <div className="flex items-center px-6 py-4 justify-between">
        <div className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:opacity-80 ">
          <Link href={`/profile/${post.user.username}`} target="_blank">
            <div className="flex flex-row items-center">
              <Image
                src={
                  !post.user?.image
                    ? "/../icon.png"
                    : post.user?.image
                          .split("image/upload")[0]
                          .includes("cloudinary")
                      ? `${
                          post.user?.image?.split("/image/upload/")[0]
                        }/image/upload/c_fill,h_160,w_160/${
                          post.user?.image?.split("/image/upload/")[1]
                        }`
                      : post.user?.image
                }
                width={160}
                height={160}
                alt={post.user.username || "User image"}
                className="rounded-full h-10 w-10 mr-3"
              />
              <span className="font-bold">{post.user.username}</span>
            </div>
          </Link>
        </div>

        {!isOwnProfile ? (
          isCurrentFollowed ? (
            <Button
              variant="outline"
              className="w-20"
              size={"sm"}
              onClick={async () => {
                await fetch("/api/user/unfollow", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: post.user.username,
                  }),
                })
                revalPath("/explore")
              }}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className="w-20"
              size={"sm"}
              onClick={async () => {
                await fetch("/api/user/follow", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: post.user.username,
                  }),
                })
                revalPath("/explore")
              }}
            >
              Follow
            </Button>
          )
        ) : (
          <MoreVertical className="w-6 h-6" />
        )}
      </div>
      <Image
        src={post.imageUrl}
        width={1000}
        height={1000}
        alt="Post picture"
        className="w-full"
      />
      <div className="flex justify-start px-6 py-6">
        <div className="flex flex-col">
          <p className="mb-2">{post?.description}</p>
          <TimeStamp datetimeISO={time} />
        </div>
      </div>
    </div>
  )
}

export default PostContent
