"use client"

import { useToast } from "@/hooks/useToast"
import { revalPath } from "@/lib/revalidate"
import { Comment, User } from "@prisma/client"
import { Edit3, MoreHorizontal, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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

const CommentItem = ({
  comment,
  postId,
}: {
  comment: Comment & { user: Pick<User, "username" | "image"> }
  postId: string
}) => {
  const { toast } = useToast()
  const [isEdit, setIsEdit] = useState(false)
  const [editComment, setComment] = useState(comment.content)
  const commentTime = new Date(comment.createdAt).toISOString()

  const handleUpdate = async () => {
    setIsEdit(!isEdit)
    const set = await fetch("/api/explore/post/comment", {
      method: "PUT",
      body: JSON.stringify({
        commentId: comment.id,
        updatedContent: editComment,
      }),
    })
    const msg = await set.json()
    if (!set.ok) {
      toast({
        variant: "destructive",
        title: "Failed to update comment",
        description: msg.message,
      })
    } else {
      revalPath("/explore")
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    const set = await fetch("/api/explore/post/deleteComment", {
      method: "POST",
      body: JSON.stringify({
        commentId: commentId,
        postId: postId,
      }),
    })
    const msg = await set.json()
    if (!set.ok) {
      toast({
        variant: "destructive",
        title: "Failed to delete comment",
        description: msg.message,
      })
    } else {
      revalPath("/explore")
    }
  }

  return (
    <div className="w-full flex flex-row space-x-3">
      <Link href={`/profile/${comment.user.username}`} target="_blank">
        <div className="w-10">
          <Image
            src={
              !comment.user?.image
                ? "/../icon.png"
                : comment.user?.image
                      .split("image/upload")[0]
                      .includes("cloudinary")
                  ? `${comment.user?.image?.split("/image/upload/")[0]}/image/upload/c_fill,h_160,w_160/${comment.user?.image?.split("/image/upload/")[1]}`
                  : comment.user?.image
            }
            width={160}
            height={160}
            alt={comment.user.username || "User"}
            className="rounded-full h-10 w-10"
          />
        </div>
      </Link>
      <div className="flex flex-col flex-grow space-y-1">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-2">
            <Link href={`/profile/${comment.user.username}`} target="_blank">
              <p className="font-semibold hover:cursor-pointer">
                {comment.user.username}
              </p>
            </Link>
            <TimeStamp datetimeISO={commentTime} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreHorizontal className="w-4 h-4 hover:cursor-pointer hover:text-mainAccent " />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit bg-white">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="focus:bg-accent"
                  onClick={() => setIsEdit(true)}
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="focus:bg-accent"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4 text-red-700" />
                  <span className="text-red-700">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {!isEdit ? (
          <span className="text-sm">{comment.content}</span>
        ) : (
          <Textarea
            className="mb-4"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your description here..."
            defaultValue={comment.content || ""}
            style={{ resize: "none" }}
          />
        )}
        <div className="flex flex-row justify-end py-1 items-center hover:cursor-pointer transition-all ease-in-out duration-300">
          {isEdit && (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
