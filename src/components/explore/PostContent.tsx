"use client"

import { useToast } from "@/hooks/useToast"
import { revalPath } from "@/lib/revalidate"
import { User } from "@prisma/client"
import { Post } from "@prisma/client"
import { Edit3, MoreVertical, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRef } from "react"

import TimeStamp from "../TimeStamp"
import { Button } from "../ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu"
import { Textarea } from "../ui/TextArea"

const PostContent = ({
  post,
  isOwnProfile,
  isCurrentFollowed,
}: {
  post: Post & { user: User }
  isOwnProfile: boolean
  isCurrentFollowed: boolean
}) => {
  const { toast } = useToast()
  const [description, setDescription] = useState(post.description)
  const [isEdit, setIsEdit] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [expandedable, setExpandedable] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  const time = new Date(post.createdAt).toISOString()

  function isExpandable(): boolean | undefined {
    if (containerRef.current && descriptionRef.current) {
      const conth = containerRef.current.clientHeight
      const parah = parseInt(
        getComputedStyle(descriptionRef.current).lineHeight,
      )

      const lineCount = conth / parah
      return lineCount > 3
    }
  }
  useEffect(() => {
    isExpandable() === true ? setExpandedable(true) : setExpandedable(false)
  }, [])

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical className="w-6 h-6 hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit bg-white">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="focus:bg-slate-100"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="focus:bg-slate-100"
                  onClick={async () => {
                    toast({
                      title: "Deleting...",
                    })

                    const set = await fetch("/api/explore/deletePost", {
                      method: "POST",
                      body: JSON.stringify({
                        postId: post.id,
                      }),
                    })
                    const msg = await set.json()
                    if (!set.ok) {
                      toast({
                        variant: "destructive",
                        title: "Failed to delete post",
                        description: msg.message,
                      })
                    } else {
                      toast({
                        title: "Successfully deleted post",
                      })
                      revalPath("/explore")
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4 text-red-700" />
                  <span className="text-red-700">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <Image
        src={post.imageUrl}
        width={1000}
        height={1000}
        alt="Post picture"
        className="w-full"
      />

      <div className="flex flex-col px-6 py-6" ref={containerRef}>
        {!isEdit ? (
          <>
            <p
              className={`${expanded || !expandedable ? "" : "line-clamp-2"} mb-2`}
              ref={descriptionRef}
            >
              {post?.description}
            </p>
            {/* <span>
              {expandedable && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="font-bold text-navy-300 transition-all ease-in-out hover:underline hover:duration-300"
                >
                  {!expanded ? "See more" : "See less"}
                </button>
              )}
            </span> */}
          </>
        ) : (
          <Textarea
            className="mb-4"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Your description here..."
            defaultValue={post?.description || ""}
            style={{ resize: "none" }}
          />
        )}
        <div className="flex justify-between items-center">
          <TimeStamp datetimeISO={time} />
          {isEdit && (
            <div className="flex flex-row items-center space-x-2">
              <Button
                variant="destructive"
                className="w-20"
                size={"sm"}
                onClick={() => setIsEdit(!isEdit)}
              >
                Cancel
              </Button>
              <Button
                className="w-20"
                size={"sm"}
                onClick={async () => {
                  setIsEdit(!isEdit)
                  toast({
                    title: "Updating...",
                  })

                  const set = await fetch("/api/explore/post", {
                    method: "PUT",
                    body: JSON.stringify({
                      newDescription: description,
                      postId: post.id,
                    }),
                  })
                  const msg = await set.json()
                  if (!set.ok) {
                    toast({
                      variant: "destructive",
                      title: "Failed to update description",
                      description: msg.message,
                    })
                  } else {
                    toast({
                      title: "Successfully updated description",
                    })
                    revalPath("/explore")
                  }
                }}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostContent
