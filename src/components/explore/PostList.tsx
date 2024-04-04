"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Post, PostType } from "@prisma/client"
import { User } from "@prisma/client"
import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import PostContent from "./PostContent"
import UserCard from "./UserCard"

interface PostListProps {
  fetchedPosts: (Post & { user: User })[] | null
  fetchedUsers: User[] | null
}

const searchSchema = z.object({
  searchTerm: z.string(),
  filter: z.string(),
})

const PostList: React.FC<PostListProps> = ({ fetchedPosts, fetchedUsers }) => {
  const [posts, setPosts] = useState<(Post & { user: User })[] | null>(
    fetchedPosts,
  )
  const [users, setUsers] = useState<User[] | null>(fetchedUsers)
  const { register, setValue, watch } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
      filter: "post",
    },
  })

  const searchTerm = watch("searchTerm")
  const filter = watch("filter")

  useEffect(() => {
    if (filter === "users") {
      const filtered = fetchedUsers?.filter((user) =>
        user?.username?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setUsers(filtered || null)
    } else if (filter === "post") {
      const filtered = fetchedPosts?.filter(
        (post) =>
          post?.description?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          post.type === PostType.Post,
      )
      setPosts(filtered || null)
    } else {
      const filtered = fetchedPosts?.filter(
        (post) =>
          post?.description?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          post.type === PostType.PetSitting,
      )
      setPosts(filtered || null)
    }
  }, [searchTerm, filter, fetchedPosts, fetchedUsers])

  return (
    <div className="flex flex-col space-x-4 space-y-4">
      <div className="flex flex-row space-x-2 px-4">
        <div className="flex flex-row items-center">
          <div className="relative flex grow items-center bg-white rounded-md">
            <Input
              {...register("searchTerm")}
              type="text"
              placeholder="Search..."
              className="pr-20 py-2 grow bg-white outline-none rounded-md"
            />

            {watch("searchTerm").length !== 0 && (
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
          defaultValue={watch("filter")}
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
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 space-y-4">
          {filter !== "users" ? (
            posts && posts?.length > 0 ? (
              posts?.map((post) => <PostContent key={post.id} post={post} />)
            ) : (
              <p className="py-4">No posts found</p>
            )
          ) : users && users?.length > 0 ? (
            users?.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <p className="py-4">No users found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostList
