"use client"

import { getAllPosts } from "@/lib/actions/post"
import { Post, User } from "@prisma/client"
import { useEffect, useState } from "react"

import FilterSearch from "./FilterSearch"
import PostContent from "./PostContent"

const PostList = () => {
  const [posts, setPosts] = useState<(Post & { user: User })[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts()
        setPosts(data || [])
      } catch (error) {
        console.error(error)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="flex flex-col items-start space-x-4 space-y-4">
      <FilterSearch />
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <PostContent key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PostList
