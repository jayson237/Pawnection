"use client"

import { TabsContent } from "@radix-ui/react-tabs"
import Image from "next/image"
import React, { Fragment } from "react"
import useSWR from "swr"

import { ExtendedPost } from "../../../lib/actions/post"
import { fetcher } from "../../../lib/utils"
import { SafeUser } from "../../../types"
import Loading from "../../Loading"
import PostItem from "../../explore/PostItem"

interface ProfilePostsTabInterface {
  user: SafeUser
}

function ProfilePostsTab({ user }: ProfilePostsTabInterface) {
  const { data: posts, isLoading } = useSWR<{ data: ExtendedPost[] }>(
    `/api/explore/post/${user.id}`,
    fetcher,
  )

  return (
    <TabsContent value="posts" className="w-full h-full pt-16">
      <div className="w-full max-w-xl mx-auto space-y-6">
        {posts && posts.data.length > 0
          ? posts?.data.map((post, i) => {
              return (
                <Fragment key={i}>
                  <PostItem
                    post={post}
                    isLiked={post.isCurrentUserLike}
                    isOwnProfile={true}
                    isCurrentFollowed={true}
                  />
                </Fragment>
              )
            })
          : !isLoading && <p className="py-4 text-center">No results found</p>}
      </div>
      {isLoading && (
        <div className="flex justify-center py-4">
          <Loading />
        </div>
      )}
    </TabsContent>
  )
}

export default ProfilePostsTab
