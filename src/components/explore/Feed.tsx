"use client"

import { SafeUser } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post, PostType } from "@prisma/client"
import { User } from "@prisma/client"
import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

import Loading from "../Loading"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import { Switch } from "../ui/Switch"
import PostItem from "./PostItem"
import UserItem from "./UserItem"

interface FeedProps {
  fetchedPosts: (Post & { user: User })[] | null
  fetchedUsers: User[] | null
  currentUser?: SafeUser
}

const searchSchema = z.object({
  searchTerm: z.string(),
  filter: z.string(),
  viewFollowingPosts: z.boolean(),
})

const Feed: React.FC<FeedProps> = ({
  fetchedPosts,
  fetchedUsers,
  currentUser,
}) => {
  const [posts, setPosts] = useState<(Post & { user: User })[] | null>(
    fetchedPosts,
  )
  const [users, setUsers] = useState<User[] | null>(fetchedUsers)
  const { register, setValue, watch } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
      filter: "post",
      viewFollowingPosts: false,
    },
  })

  const searchTerm = watch("searchTerm")
  const filter = watch("filter")
  const viewFollowingPosts = watch("viewFollowingPosts")

  useEffect(() => {
    const filterPosts = (
      posts: (Post & { user: User })[] | null,
      typeCheck: PostType,
      followingCondition = true,
    ) =>
      posts?.filter(
        (post) =>
          post?.description?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          post.type === typeCheck &&
          (!followingCondition ||
            currentUser?.followingUsers?.some(
              (followingUser) => followingUser?.followerId === post.user?.id,
            )),
      ) || null
    switch (filter) {
      case "users":
        setUsers(
          fetchedUsers?.filter((user) =>
            user?.username?.toLowerCase().includes(searchTerm.toLowerCase()),
          ) || null,
        )
        break
      case "post":
        setPosts(filterPosts(fetchedPosts, PostType.Post, viewFollowingPosts))
        break
      case "petSitting":
        setPosts(
          filterPosts(fetchedPosts, PostType.PetSitting, viewFollowingPosts),
        )
        break
      default:
        break
    }
  }, [
    searchTerm,
    filter,
    fetchedPosts,
    fetchedUsers,
    viewFollowingPosts,
    currentUser,
  ])

  return (
    <div className="flex flex-col space-x-4 space-y-4">
      <div className="flex flex-row space-x-2 px-4 items-center">
        <div className="flex flex-row items-center">
          <div className="relative flex grow items-center bg-white rounded-md">
            <Input
              {...register("searchTerm")}
              type="text"
              placeholder="Search..."
              className="pr-20 py-2 grow bg-white outline-none rounded-md"
            />

            {searchTerm.length !== 0 && (
              <Button
                onClick={() => {
                  setValue("searchTerm", "")
                }}
                className="absolute right-8"
                variant="search"
              >
                <X className="text-gray-500 hover:text-primary duration-300 ease-in-out transition-all w-5 h-5" />
              </Button>
            )}

            <Button
              type="submit"
              className="absolute right-2 pr-2"
              variant="search"
            >
              <Search className="text-gray-500 hover:text-primary duration-300 ease-in-out transition-all w-5 h-5" />
            </Button>
          </div>
        </div>
        <Select
          onValueChange={(val) => setValue("filter", val)}
          defaultValue={filter}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="post">Pet posts</SelectItem>
            <SelectItem value="petSitting">Pet sittings</SelectItem>
            <SelectItem value="users">Users</SelectItem>
          </SelectContent>
        </Select>
        {(filter === "post" || filter === "petSitting") && (
          <>
            <Switch
              checked={viewFollowingPosts}
              onCheckedChange={() =>
                setValue("viewFollowingPosts", !viewFollowingPosts)
              }
            />
            <p className="text-[11px]">See followings only</p>
          </>
        )}
      </div>

      <div
        className={`${!fetchedPosts || !fetchedUsers ? "flex justify-center" : ""}`}
      >
        <div className="flex flex-col space-y-4">
          {(!fetchedPosts || !fetchedUsers) && <Loading />}
          {filter !== "users" ? (
            posts && posts?.length > 0 ? (
              posts?.map((post) => {
                const username = post.user?.username
                const isOwnProfile = currentUser?.username === username
                return (
                  <div key={post.id}>
                    <PostItem
                      post={post}
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
              })
            ) : (
              <p className="py-4">No posts found</p>
            )
          ) : users && users?.length > 0 ? (
            users?.map((user) => {
              const isOwnProfile = currentUser?.username === user.username
              return (
                <div key={user.id}>
                  <UserItem
                    user={user}
                    isOwnProfile={isOwnProfile}
                    isCurrentFollowed={
                      currentUser?.followingUsers?.some(
                        (followingUser) =>
                          followingUser?.followerId === user.id,
                      ) || false
                    }
                  />
                </div>
              )
            })
          ) : (
            <p className="py-4">No users found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Feed
