"use client"

import { SafeUser } from "@/types"
import { Comment, Like, Post, User } from "@prisma/client"
import { useCallback, useEffect, useRef, useState } from "react"
import useSWR from "swr"

import { fetcher } from "../../lib/utils"
import Loading from "../Loading"
import PostItem from "./PostItem"
import UserItem from "./UserItem"

type ExtendedPost = Post & {
  user: User
  likes: (Like & { user: SafeUser })[]
  comments: (Comment & { user: User })[]
}

const Feed = ({
  currentUser,
  searchParams,
}: {
  currentUser: SafeUser
  searchParams: {
    q: string
    type: "post" | "users" | "petSitting"
    following: string
  }
}) => {
  const [api, setApi] = useState<string | null>(null)

  const { data, mutate } = useSWR(() => (api ? `${api}` : null), fetcher)
  const [content, setContent] = useState<{
    posts: ExtendedPost[]
    users: User[]
  }>({ posts: [], users: [] })
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null)

  const fetchContent = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    const type = searchParams.type
    const cursor =
      type === "post" || type === "petSitting"
        ? content.posts.length > 0
          ? content.posts[content.posts.length - 1].id
          : null
        : content.users.length > 0
          ? content.users[content.users.length - 1].id
          : null

    const queryParams = []

    if (cursor) queryParams.push(`cursor=${cursor}`)
    if (type) queryParams.push(`type=${type}`)
    if (searchParams?.q) queryParams.push(`q=${searchParams.q}`)
    if (searchParams?.following === "true") queryParams.push("following=true")

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : ""

    const endpoint =
      searchParams.type === "users" ? "/api/user" : "/api/explore/post"

    setApi(`${endpoint}${queryString}`)
  }, [
    loading,
    hasMore,
    searchParams,
    content.posts.length,
    content.users.length,
  ])

  useEffect(() => {
    if (data) {
      if (searchParams.type === "users") {
        setContent((prev) => ({
          ...prev,
          users:
            searchParams.type === "users"
              ? [...prev.users, ...data]
              : prev.users,
        }))
      } else {
        setContent((prev) => ({
          ...prev,
          posts:
            searchParams.type !== "users"
              ? [...prev.posts, ...data]
              : prev.posts,
        }))
        setHasMore(data.length !== 0)
      }
      setHasMore(data.length !== 0)
      setLoading(false)
    }
  }, [data])

  useEffect(() => {
    setHasMore(true)
    setContent({ posts: [], users: [] })
  }, [searchParams])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchContent()
      },
      { rootMargin: "0px 0px 100px" },
    )

    if (loadMoreTriggerRef.current) observer.observe(loadMoreTriggerRef.current)

    return () => observer.disconnect()
  }, [fetchContent])

  const renderPostItem = (
    post: Post & {
      user: User
      likes: (Like & { user: SafeUser })[]
      comments: (Comment & { user: User })[]
    },
  ) => {
    const isOwnProfile = currentUser?.username === post.user?.username
    const isLiked = post.likes.some((like) => like.userId === currentUser?.id)

    return (
      <div key={post.id}>
        <PostItem
          post={post}
          isLiked={isLiked}
          isOwnProfile={isOwnProfile}
          isCurrentFollowed={
            currentUser?.followingUsers?.some(
              (followingUsers) => followingUsers?.followerId === post.user?.id,
            ) || false
          }
        />
      </div>
    )
  }

  const renderUserItem = (user: User) => {
    const isOwnProfile = currentUser?.username === user.username
    return (
      <div key={user.id}>
        <UserItem
          user={user}
          isOwnProfile={isOwnProfile}
          isCurrentFollowed={
            currentUser?.followingUsers?.some(
              (followingUser) => followingUser?.followerId === user.id,
            ) || false
          }
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      {searchParams.type !== "users"
        ? content.posts.map(renderPostItem)
        : content.users.map(renderUserItem)}
      {loading && (
        <div className="flex justify-center py-4">
          <Loading />
        </div>
      )}
      {!loading && content.posts.length === 0 && content.users.length === 0 && (
        <p className="py-4 text-center">No results found</p>
      )}
      <div ref={loadMoreTriggerRef} className="mb-8" />
    </div>
  )
}

export default Feed
