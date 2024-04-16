"use client"

import { useQueryState } from "nuqs"
import React, { useState } from "react"
import useSWR from "swr"

import { ExtendedPost } from "../../lib/actions/post"
import { fetcher } from "../../lib/utils"
import { SafeUser } from "../../types"
import Loading from "../Loading"
import InfiniteScroll from "./InfiniteScroll"
import PostItem from "./PostItem"

function ExplorePost({ currentUser }: { currentUser: SafeUser }) {
  const [query, _setQuery] = useQueryState("q", {
    defaultValue: "",
  })
  const [following, _setFollowing] = useQueryState("following", {
    defaultValue: "",
  })

  const [items, setItems] = useState<ExtendedPost[]>([])
  const [hasMore, sethasMore] = useState(false)
  const [cursor, setCursor] = useState("")

  const { data, isLoading } = useSWR(
    `/api/explore/post?type=post&q=${query}&following=${following}&cursor=${
      hasMore ? cursor : following ? "" : cursor
    }`,
    fetcher,
    {
      onSuccess: (data) => {
        if (data.data) {
          console.log(query, following)

          if (query !== "" || following !== "") {
            console.log("1")

            setItems(data.data)
          } else {
            console.log("2")
            setItems((prevItems) => [...prevItems, ...data.data])
          }

          sethasMore(data.meta.hasMore)
        }
      },
    },
  )

  const loadMore = () => {
    if (!isLoading && hasMore) {
      console.log("se")

      // setCursor(data.meta.hasMore ? data.meta.cursor : cursor)
    }
  }

  // to-do: implement seperate component because it was implemented in three different components
  return (
    <>
      <div className="flex flex-col space-y-4">
        {!isLoading &&
          items?.map((post: ExtendedPost) => {
            const isOwnProfile = currentUser?.username === post.user?.username
            const isLiked = post.isCurrentUserLike

            return (
              <div key={post.id}>
                <PostItem
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
        {isLoading && (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        )}
        {!items?.length && !isLoading && (
          <div className="flex justify-center items-center">
            <p className="text-gray-500">No posts found</p>
          </div>
        )}
      </div>
      <InfiniteScroll loadMore={loadMore} />
    </>
  )
}

export default ExplorePost
