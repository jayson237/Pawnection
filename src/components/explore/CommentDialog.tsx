"use client"

import { Comment, User } from "@prisma/client"
import { SendHorizonal } from "lucide-react"
import React, { useRef, useState } from "react"
import useSWR from "swr"

import { toast } from "../../hooks/useToast"
import { ExtendedPost } from "../../lib/actions/post"
import { revalPath } from "../../lib/revalidate"
import { fetcher } from "../../lib/utils"
import Loading from "../Loading"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/Dialog"
import { Input } from "../ui/Input"
import CommentItem from "./CommentItem"

function CommentDialog({
  post,
  isOpen,
  setOpen,
}: {
  post: ExtendedPost
  isOpen: boolean
  setOpen: (open: boolean) => void
}) {
  const [comment, setComment] = useState("")

  const dialogRef = useRef<HTMLDivElement>(null)

  const { data: comments, isLoading } = useSWR<{
    data: (Comment & { user: Pick<User, "username" | "image"> })[]
    message: string
  }>(isOpen ? `/api/explore/post/${post.id}/comments` : null, fetcher, {
    keepPreviousData: true,
  })

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
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="text-sm text-gray-500 hover:text-mainAccent ease-in-out transition-all hover:cursor-pointer w-fit">
          View all {post.comments_count} comments
        </p>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[700px] max-h-[70vh] overflow-y-auto pb-0"
        ref={dialogRef}
      >
        <DialogHeader>
          <DialogDescription>Comments</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loading />
          </div>
        ) : comments && comments.data.length > 0 ? (
          comments.data.map((comment) => (
            <div className="w-full" key={comment.id}>
              <CommentItem comment={comment} postId={post.id} />
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
  )
}

export default CommentDialog
