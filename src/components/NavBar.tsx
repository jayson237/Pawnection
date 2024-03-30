"use client"

import { SafeUser } from "@/types"
import { LogOutIcon } from "lucide-react"
import { LogOut, Settings, User } from "lucide-react"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import PostForm from "./explore/PostForm"
import { Button } from "./ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import { NavigationMenu, NavigationMenuList } from "./ui/NavMenu"
import { Spinner } from "./ui/Spinner"

function NavBar({ currentUser }: { currentUser?: SafeUser | null }) {
  const router = useRouter()
  const session = useSession()
  const username = currentUser?.username

  return (
    <div className="sticky top-0 z-[20] flex w-full place-content-between px-12 py-4 drop-shadow md:px-24 items-center border-b bg-main">
      <Image
        src="/pawnection.svg"
        alt="Pawnection"
        width={0}
        height={0}
        priority={true}
        className="cursor-pointer h-[30px] w-[187.5px]"
        onClick={() => {
          router.push("/")
        }}
      />
      <NavigationMenu>
        <NavigationMenuList className="hidden sm:flex">
          {session.status === "authenticated" && (
            <>
              <div className="flex items-center space-x-1 ">
                <Link
                  href="/lostAndFound"
                  className="text-primary text-sm font-medium hover:bg-submain py-2 px-4 rounded-md ease-in-out duration-200"
                >
                  Lost & Found
                </Link>
                <Link
                  href="/adopt"
                  className="text-primary text-sm font-medium hover:bg-submain py-2 px-4 rounded-md ease-in-out duration-200"
                >
                  Adopt
                </Link>
                <Link
                  href="/explore"
                  className="text-primary text-sm font-medium hover:bg-submain py-2 px-4 rounded-md ease-in-out duration-200"
                >
                  Explore
                </Link>
                <Link
                  href="/recommendations"
                  className="text-primary text-sm font-medium hover:bg-submain rounded-md ease-in-out duration-200 py-2 px-4"
                >
                  Recommendations
                </Link>
                {currentUser?.type === "PetAdoptionCentre" && (
                  <Link
                    href="/adoption-center"
                    className="text-primary text-sm font-medium hover:bg-submain rounded-md ease-in-out duration-200 py-2 px-4"
                  >
                    Centre Management
                  </Link>
                )}
              </div>
            </>
          )}
          {session.status === "authenticated" && (
            <>
              <div className="mr-4">
                <PostForm />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    className="rounded-full h-10 w-10 ring-1 ring-primary ring-offset-2 hover:opacity-80 ease-in-out duration-200 cursor-pointer"
                    src={currentUser?.image || "/../icon.png"}
                    width={160}
                    height={160}
                    alt="Your avatar"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() =>
                        !currentUser
                          ? router.push("/auth")
                          : router.push(`/profile/${username}`)
                      }
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      signOut({ callbackUrl: "/" })
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {session.status === "loading" ? (
            <Button className="w-20 px-4">
              <Spinner />
            </Button>
          ) : (
            session.status !== "authenticated" && (
              <Button
                className="w-20 px-4"
                onClick={() => router.push("/auth")}
              >
                Sign In
              </Button>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default NavBar
