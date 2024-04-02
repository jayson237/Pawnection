"use client"

import { SafeUser } from "@/types"
import { LogOut, Menu, Settings, User, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

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
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const session = useSession()
  const username = currentUser?.username

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="sticky top-0 z-[100] flex w-full place-content-between px-4 py-4 drop-shadow md:px-12 items-center border-b bg-main">
      <Image
        src="/pawnection.svg"
        alt="Pawnection"
        width={0}
        height={0}
        priority={true}
        className="cursor-pointer h-[30px] w-[187.5px] mr-12"
        onClick={() => {
          router.push("/")
        }}
      />
      <NavigationMenu>
        <NavigationMenuList className="hidden md:flex md:ml-12">
          {session.status === "authenticated" && (
            <>
              <div className="flex items-center space-x-1 ">
                <Link
                  href="/lostAndFound"
                  className="text-primary text-center text-sm font-medium hover:bg-submain py-2 px-4 rounded-md ease-in-out duration-200"
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
                    Adoption Management
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
                    src={
                      `${
                        currentUser?.image?.split("/image/upload/")[0]
                      }/image/upload/c_fill,h_160,w_160/${
                        currentUser?.image?.split("/image/upload/")[1]
                      }` || "/../icon.png"
                    }
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
        <div className="md:hidden cursor-pointer pl-24 flex items-center space-x-4">
          {session.status === "authenticated" && (
            <>
              <Menu size={24} onClick={toggleMenu} />
              <Button className="px-4 py-2 border" variant="ghost">
                <Link href={!currentUser ? "/auth" : `/profile/${username}`}>
                  <User />
                </Link>
              </Button>
            </>
          )}
        </div>
        <div
          className={
            isOpen
              ? "fixed right-0 top-0 w-[55%] md:hidden h-screen bg-[#FFECE4] p-10 ease-in duration-500"
              : "fixed right-[-100%] top-0 p-10 ease in duration-500"
          }
        >
          <div className="flex w-full items-center justify-end">
            <div onClick={toggleMenu} className="cursor-pointer">
              <X size={24} />
            </div>
          </div>
          <div className="flex-col">
            {session.status === "authenticated" && (
              <ul className="space-y-5">
                <li>
                  <div className="flex border rounded-[16px]">
                    <div>
                      <Link
                        href={`/profile/${currentUser?.username}`}
                        onClick={toggleMenu}
                      >
                        <Image
                          src={currentUser?.image || "/../icon.png"}
                          width={48}
                          height={48}
                          alt="User avatar"
                          className="rounded-full w-full h-full"
                        ></Image>
                      </Link>
                    </div>
                    <div className="ml-4">
                      <p className="text-[18px] font-bold">
                        {currentUser?.username}
                      </p>
                      <p className="text-[14px] text-neutral-500">
                        {currentUser?.email}
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="/lost-and-found"
                    onClick={toggleMenu}
                    className="text-primary text-sm font-medium hover:bg-accent py-2 px-4 rounded-md ease-in-out duration-200"
                  >
                    Lost & Found
                  </Link>
                </li>
                <li>
                  <Link
                    href="/adopt"
                    onClick={toggleMenu}
                    className="text-primary text-sm font-medium hover:bg-accent py-2 px-4 rounded-md ease-in-out duration-200"
                  >
                    Adopt
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    onClick={toggleMenu}
                    className="text-primary text-sm font-medium hover:bg-accent py-2 px-4 rounded-md ease-in-out duration-200"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recommendations"
                    onClick={toggleMenu}
                    className="text-primary text-sm font-medium hover:bg-accent rounded-md ease-in-out duration-200 py-2 px-4"
                  >
                    Recommendations
                  </Link>
                </li>
                {currentUser?.type === "PetAdoptionCentre" && (
                  <li>
                    <Link
                      href="/adoption-center"
                      onClick={toggleMenu}
                      className="text-primary text-sm font-medium hover:bg-accent rounded-md ease-in-out duration-200 py-2 px-4"
                    >
                      Centre Management
                    </Link>
                  </li>
                )}
              </ul>
            )}

            {session.status !== "authenticated" ? (
              <ul>
                <li>
                  <Button
                    className="w-20 px-4"
                    onClick={() => router.push("/auth")}
                  >
                    Sign In
                  </Button>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Button
                    className="w-20 px-4 mt-4 ml-3"
                    onClick={() => {
                      signOut({ callbackUrl: "/" })
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </NavigationMenu>
    </div>
  )
}

export default NavBar
