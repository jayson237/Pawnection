"use client"

import { useQueryState } from "nuqs"
import React, { useCallback, useEffect, useRef, useState } from "react"

import { ExtendedPost } from "../../lib/actions/post"
import { SafeUser } from "../../types"
import Loading from "../Loading"
import PostItem from "./PostItem"

function ExplorePost({ currentUser }: { currentUser: SafeUser }) {
  const [query, _setQuery] = useQueryState("q", {
    defaultValue: "",
  })
  const [following, _setFollowing] = useQueryState("following", {
    defaultValue: "",
  })

  const [content, setContent] = useState<ExtendedPost[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null)

  const fetchContent = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    const type = "post"
    const cursor =
      type === "post" || type === "petSitting"
        ? content.length > 0
          ? content[content.length - 1].id
          : null
        : null

    const queryParams = []

    if (cursor) queryParams.push(`cursor=${cursor}`)
    if (type) queryParams.push(`type=${type}`)
    if (query) queryParams.push(`q=${query}`)
    if (following === "true") queryParams.push("following=true")

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : ""

    const endpoint = "/api/explore/post"

    try {
      const response = await fetch(`${endpoint}${queryString}`)
      const data = await response.json()
      setContent((prev) => [...prev, ...data.data])
      setHasMore(data.data.length !== 0)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, query, following, content.length])

  useEffect(() => {
    setHasMore(true)
    setContent([])
  }, [query, following])

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

  // to-do: implement seperate component because it was implemented in three different components
  return (
    <>
      <div className="flex flex-col space-y-4">
        {content?.map((post: ExtendedPost) => {
          const isOwnProfile = currentUser?.username === post.user?.username
          const isLiked = post.isCurrentUserLike

          return (
            <div key={post.id}>
              <PostItem
                content={content}
                setContent={setContent}
                post={post}
                isLiked={isLiked}
                isOwnProfile={isOwnProfile}
                isCurrentFollowed={
                  currentUser?.followingUsers?.some(
                    (followingUsers) =>
                      followingUsers?.followerId === post.user?.id,
                  ) || false
                }
              />
            </div>
          )
        })}
        {loading && (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        )}
        {content?.length === 0 && !loading && (
          <div className="flex justify-center items-center">
            <p className="text-gray-500">No posts found</p>
          </div>
        )}
      </div>
      <div ref={loadMoreTriggerRef} className="mb-8" />
    </>
  )
}

export default ExplorePost
