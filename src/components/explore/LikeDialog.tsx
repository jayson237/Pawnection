"use client"

import { Like, User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import useSWR from "swr"

import { ExtendedPost } from "../../lib/actions/post"
import { fetcher } from "../../lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/Dialog"

function LikeDialog({
  post,
  isOpen,
  setOpen,
}: {
  post: ExtendedPost
  isOpen: boolean
  setOpen: (open: boolean) => void
}) {
  const { data: likes, isLoading } = useSWR<{
    data: (Like & { user: Pick<User, "username" | "image"> })[]
    message: string
  }>(isOpen ? `/api/explore/post/${post.id}/likes` : null, fetcher, {
    keepPreviousData: true,
  })

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="hover:cursor-pointer">
          {post.likes_count > 0 &&
            (post.likes_count === 1 ? (
              <p className="font-bold text-sm">{post.likes_count} Like</p>
            ) : (
              <p className="font-bold text-sm">{post.likes_count} Likes</p>
            ))}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogDescription>Liked by</DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          {post.likes_count > 0 ? (
            likes?.data.map((like) => (
              <Link
                href={`/profile/${like.user.username}`}
                key={like.user.username}
                prefetch={false}
                className="flex items-center justify-between hover:bg-gray-200/20 p-2 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src={like.user.image ? like.user.image : "/../../icon.png"}
                    width={40}
                    height={40}
                    alt="Bordered avatar"
                  />
                  <p>{like.user.username}</p>
                </div>
                {/* {!isOwnProfile ? (
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
                ) : null} */}
              </Link>
            ))
          ) : (
            <p className="text-center">No Likes</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LikeDialog
