"use client"

import { User } from "@prisma/client"
import { Post } from "@prisma/client"
import Image from "next/image"

const PostContent = ({ post }: { post: Post & { user: User } }) => {
  return (
    <div className="rounded-xl border bg-submain h-full">
      <div className="flex items-center p-3">
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
      <Image
        src={post.imageUrl}
        width={1000}
        height={1000}
        alt="Post picture"
        className="w-full"
      />
      <div className="flex justify-start space-x-2 px-4 py-2">
        <button className="focus:outline-none">1</button>
        <button className="focus:outline-none">2</button>
      </div>
    </div>
  )
}

export default PostContent
