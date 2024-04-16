"use client"

import { User } from "@prisma/client"
import { useQueryState } from "nuqs"
import React, { useCallback, useEffect, useRef, useState } from "react"

import { SafeUser } from "../../types"
import Loading from "../Loading"
import UserItem from "./UserItem"

function ExploreUsers({ currentUser }: { currentUser: SafeUser }) {
  const [query, _setQuery] = useQueryState("q", {
    defaultValue: "",
  })
  const [content, setContent] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null)

  const fetchContent = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    const cursor = content.length > 0 ? content[content.length - 1].id : null

    const queryParams = []

    if (cursor) queryParams.push(`cursor=${cursor}`)
    if (query) queryParams.push(`q=${query}`)

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : ""

    const endpoint = "/api/user"

    try {
      const response = await fetch(`${endpoint}${queryString}`)
      const data = await response.json()
      setContent((prev) => [...prev, ...data])
      setHasMore(data.length !== 0)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, query, content.length])

  useEffect(() => {
    setHasMore(true)
    setContent([])
  }, [query])

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
        {content.map((user: User) => {
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

export default ExploreUsers
