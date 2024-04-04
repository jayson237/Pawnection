"use client"

import { User } from "@prisma/client"
import { Post } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

import TimeStamp from "../TimeStamp"

const PostContent = ({ post }: { post: Post & { user: User } }) => {
  const time = new Date(post.createdAt).toISOString()
  return (
    <div className="rounded-xl border bg-white h-full max-w-xl">
      <div className="flex items-center px-4 py-4">
        <div className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:opacity/90 ">
          <Link href={`/profile/${post.user.username}`} target="_blank">
            <div className="flex flex-row items-center">
              <Image
                src={
                  `${
                    post.user.image?.split("/image/upload/")[0]
                  }/image/upload/c_fill,h_160,w_160/${
                    post.user.image?.split("/image/upload/")[1]
                  }` || "/../icon.png"
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
