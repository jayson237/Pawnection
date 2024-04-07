"use client"

import { useToast } from "@/hooks/useToast"
import { revalPath } from "@/lib/revalidate"
import { SafeUser } from "@/types"
import { Comment, Like, Post, User } from "@prisma/client"
import {
  Edit3,
  Heart,
  MessageCircle,
  MoreHorizontal,
  SendHorizonal,
  Trash2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRef } from "react"

import TimeStamp from "../TimeStamp"
import { Button } from "../ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/Dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/TextArea"
import CommentItem from "./CommentItem"

const PostItem = ({
  post,
  isLiked,
  isOwnProfile,
  isCurrentFollowed,
}: {
  post: Post & {
    user: User
    likes: (Like & { user: SafeUser })[]
    comments: (Comment & { user: User })[]
  }
  isLiked: boolean
  isOwnProfile: boolean
  isCurrentFollowed: boolean
}) => {
  const { toast } = useToast()
  const [isImageLoading, setImageLoading] = useState(true)

  const [description, setDescription] = useState(post.description)
  const [comment, setComment] = useState("")

  const [isCommenting, setIsCommenting] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [expanded, setExpanded] = useState(false)
  const [expandable, setexpandable] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const time = new Date(post.createdAt).toISOString()

  const isExpandable = () => {
    if (containerRef.current && descriptionRef.current) {
      const conth = containerRef.current.clientHeight
      const parah = parseInt(
        getComputedStyle(descriptionRef.current).lineHeight,
      )

      const lineCount = conth / parah
      return lineCount > 1
    }
  }
  useEffect(() => {
    isExpandable() === true ? setexpandable(true) : setexpandable(false)
  }, [])

  const handleUnfollow = async (username?: string) => {
    await fetch("/api/user/unfollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
    revalPath("/explore")
  }

  const handleFollow = async (username?: string) => {
    await fetch("/api/user/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
    revalPath("/explore")
  }

  const handleUpdate = async () => {
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
        description: "Please close this window",
      })
      revalPath("/explore")
    }
  }

  const handleDelete = async () => {
    toast({
      title: "Deleting...",
    })

    const set = await fetch("/api/explore/post/deletePost", {
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
        description: "Please close this window",
      })
      revalPath("/explore")
    }
  }

  const handleLike = async () => {
    const set = await fetch("/api/explore/post/like", {
      method: "POST",
      body: JSON.stringify({
        postId: post.id,
      }),
    })
    const msg = await set.json()
    if (!set.ok) {
      toast({
        variant: "destructive",
        title: "Failed to like post",
        description: msg.message,
      })
    } else {
      revalPath("/explore")
    }
  }

  const handleDislike = async () => {
    const set = await fetch("/api/explore/post/dislike", {
      method: "POST",
      body: JSON.stringify({
        postId: post.id,
      }),
    })
    const msg = await set.json()
    if (!set.ok) {
      toast({
        variant: "destructive",
        title: "Failed to dislike post",
        description: msg.message,
      })
    } else {
      revalPath("/explore")
    }
  }

  const handleComment = async () => {
    setComment("")
    const set = await fetch("/api/explore/post/comment", {
      method: "POST",
      body: JSON.stringify({
        content: comment,
        postId: post.id,
      }),
    })
    const msg = await set.json()
    if (!set.ok) {
      toast({
        variant: "destructive",
        title: "Failed to comment",
        description: msg.message,
      })
    } else {
      revalPath("/explore")
      if (dialogRef.current) {
        dialogRef.current.scrollTo(0, 0)
      }
    }
  }

  return (
    <div className="rounded-xl border bg-white h-full max-w-xl">
      <div className="flex items-center px-6 py-4 justify-between">
        <div className="transition-all duration-300 ease-in-out hover:cursor-pointer ">
          <Link href={`/profile/${post.user.username}`} target="_blank">
            <div className="flex flex-row items-center space-x-3  ">
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
                alt={post.user.username || "User"}
                className="rounded-full h-10 w-10"
              />
              <span className="font-bold">{post.user.username}</span>
              <TimeStamp datetimeISO={time} />
            </div>
          </Link>
        </div>

        {!isOwnProfile ? (
          isCurrentFollowed ? (
            <Button
              variant="outline"
              className="w-20"
              size={"sm"}
              onClick={() => handleUnfollow(post.user.username || "")}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className="w-20"
              size={"sm"}
              onClick={() => handleFollow(post.user.username || "")}
            >
              Follow
            </Button>
          )
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-2">
                <MoreHorizontal className="w-6 h-6 hover:cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit bg-white">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="focus:bg-accent"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="focus:bg-accent"
                  onClick={handleDelete}
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
        alt="Picture"
        onLoad={() => setImageLoading(false)}
        className={`w-full ${isImageLoading ? "blur" : "remove-blur"}`}
      />

      <div className="flex flex-col px-6 py-6">
        <div className="flex flex-row items-center space-x-4 pb-2">
          {!isLiked ? (
            <Heart
              className="w-6 h-6 bg-transparent hover:cursor-pointer transition-all ease-in-out hover:duration-200 hover:text-red-400 hover:fill-red-400"
              onClick={handleLike}
            />
          ) : (
            <Heart
              className="w-6 h-6 fill-red-400 text-red-400 hover:cursor-pointer"
              onClick={handleDislike}
            />
          )}
          <MessageCircle
            className="w-6 h-6 hover:cursor-pointer hover:duration-300 ease-in-out transition-all hover:text-mainAccent"
            onClick={() => setIsCommenting(!isCommenting)}
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <div className="hover:cursor-pointer">
              {post.likes.length > 0 &&
                (post.likes.length === 1 ? (
                  <p className="font-bold text-sm">{post.likes.length} Like</p>
                ) : (
                  <p className="font-bold text-sm">{post.likes.length} Likes</p>
                ))}
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-y-auto">
            <DialogHeader>
              <DialogDescription>Liked by</DialogDescription>
            </DialogHeader>
            <div className="space-y-1">
              {post.likes.length > 0 ? (
                post.likes.map((like) => (
                  <Link
                    href={`/profile/${like.user.username}`}
                    key={like.user.username}
                    className="flex items-center justify-between hover:bg-gray-200/20 p-2 rounded-lg transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        className="object-cover w-10 h-10 rounded-full"
                        src={
                          like.user.image ? like.user.image : "/../../icon.png"
                        }
                        width={40}
                        height={40}
                        alt="Bordered avatar"
                      />
                      <p>{like.user.username}</p>
                    </div>
                    {!isOwnProfile ? (
                      !like.user.isCurrentFollowed ? (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleFollow(like.user.username || "")}
                        >
                          Follow
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFollow(like.user.username || "")}
                        >
                          Unfollow
                        </Button>
                      )
                    ) : null}
                  </Link>
                ))
              ) : (
                <p className="text-center">No Likes</p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <div className="py-2">
          {!isEdit ? (
            <div ref={containerRef}>
              <p
                className={`text-[14px] ${expanded || !expandable ? "" : "line-clamp-1"} `}
                ref={descriptionRef}
              >
                {post?.description}
              </p>
              <span className="text-sm">
                {expandable && (
                  <div
                    onClick={() => setExpanded(!expanded)}
                    className=" text-gray-500 transition-all ease-in-out hover:underline hover:duration-300"
                  >
                    {!expanded ? "See more..." : "See less"}
                  </div>
                )}
              </span>
            </div>
          ) : (
            <Textarea
              className="mb-4"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Your description here..."
              defaultValue={post?.description || ""}
              style={{ resize: "none" }}
            />
          )}
        </div>

        {isEdit ? (
          <div className="flex justify-end items-center">
            <div className="flex flex-row items-center space-x-2">
              <Button
                variant="destructive"
                className="w-20"
                size={"sm"}
                onClick={() => setIsEdit(!isEdit)}
              >
                Cancel
              </Button>
              <Button className="w-20" size={"sm"} onClick={handleUpdate}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <>
            {post.comments.length > 0 && (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <p className="text-sm text-gray-500 hover:text-mainAccent ease-in-out transition-all hover:cursor-pointer w-fit">
                      View all comments
                    </p>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[700px] max-h-[70vh] overflow-y-auto pb-0"
                    ref={dialogRef}
                  >
                    <DialogHeader>
                      <DialogDescription>Comments</DialogDescription>
                    </DialogHeader>

                    {post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <div className="w-full" key={comment.id}>
                          <CommentItem comment={comment} />
                        </div>
                      ))
                    ) : (
                      <p className="text-center">No comments</p>
                    )}
                    <div className="sticky bottom-0 left-0 w-full px-4 py-4 bg-white">
                      <Input
                        placeholder="Add a comment..."
                        className="pr-12"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      {comment !== "" && (
                        <SendHorizonal
                          className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 hover:cursor-pointer hover:duration-300 ease-in-out transition-all hover:text-mainAccent"
                          onClick={handleComment}
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="items-center py-2">
                  {post.comments.slice(0, 2).map((comment) => (
                    <div key={comment.id} className="text-sm flex flex-row">
                      <p className="font-semibold mr-1">
                        {comment.user.username}
                      </p>
                      <p className="line-clamp-1">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            {isCommenting && (
              <div className="relative py-2">
                <Input
                  placeholder="Add a comment..."
                  className="pr-12"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                {comment !== "" && (
                  <SendHorizonal
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 hover:cursor-pointer hover:duration-300 ease-in-out transition-all hover:text-mainAccent"
                    onClick={handleComment}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PostItem
