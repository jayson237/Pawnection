"use client"

import { ExtendedPost } from "@/lib/actions/post"
import { SafeUser } from "@/types"
import { TabsContent } from "@radix-ui/react-tabs"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import { useRef } from "react"

import Loading from "../../Loading"
import PostItem from "../../explore/PostItem"

interface ProfilePostsTabInterface {
  user: SafeUser
  currentUser: SafeUser
}

function ProfilePostsTab({ user, currentUser }: ProfilePostsTabInterface) {
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [content, setContent] = useState<ExtendedPost[]>([])
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null)

  const fetchContent = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    const cursor = content.length > 0 ? content[content.length - 1].id : null

    const queryParams = []

    if (cursor) queryParams.push(`cursor=${cursor}`)

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : ""

    const endpoint = `/api/explore/post/${user.id}`
    const url = `${endpoint}${queryString}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      setContent((prev) => [...prev, ...data.data])
      setHasMore(data.data.length !== 0)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, content.length])

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

  return (
    <TabsContent value="posts" className="w-full h-full pt-16">
      <div className="w-full max-w-xl mx-auto space-y-4">
        {content &&
          content?.map((post, i) => {
            return (
              <Fragment key={i}>
                <PostItem
                  content={content}
                  setContent={setContent}
                  post={post}
                  isLiked={post.isCurrentUserLike}
                  isOwnProfile={currentUser.id === user.id}
                  isCurrentFollowed={
                    currentUser?.followingUsers?.some(
                      (followingUsers) =>
                        followingUsers?.followerId === user?.id,
                    ) || false
                  }
                />
              </Fragment>
            )
          })}
      </div>
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
      <div ref={loadMoreTriggerRef} className="mb-8" />
    </TabsContent>
  )
}

export default ProfilePostsTab
