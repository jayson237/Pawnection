"use client"

import { User } from "@prisma/client"
import { useQueryState } from "nuqs"
import React from "react"
import useSWR from "swr"

import { fetcher } from "../../lib/utils"
import { SafeUser } from "../../types"
import Loading from "../Loading"
import UserItem from "./UserItem"

function ExploreUsers({ currentUser }: { currentUser: SafeUser }) {
  const [query, _setQuery] = useQueryState("q", {
    defaultValue: "",
  })
  const { data, isLoading } = useSWR(`/api/user?q=${query}`, fetcher, {})

  // to-do: implement seperate component because it was implemented in three different components
  return (
    <div className="flex flex-col space-y-4">
      {!isLoading &&
        data?.data?.map((user: User) => {
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
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      )}
      {!data?.length && !isLoading && (
        <div className="flex justify-center items-center">
          <p className="text-gray-500">No user found</p>
        </div>
      )}
    </div>
  )
}

export default ExploreUsers
