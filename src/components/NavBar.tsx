"use client"

import { SafeUser } from "@/types"
import { Menu, User, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "./ui/Button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/NavMenu"

function NavBar({ currentUser }: { currentUser?: SafeUser | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const session = useSession()
  const username = currentUser?.username

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div className="sticky top-0 z-[100] flex w-full place-content-between px-12 py-4 drop-shadow md:px-24 items-center border-b bg-[#FFF8F5]">
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
          <NavigationMenuList className="hidden sm:flex gap-x-0.5">
            {session.status === "authenticated" && (
              <>
                <div className="flex gap-x-4 items-center ">
                  <Link
                    href="/lost-and-found"
                    className="text-primary text-sm font-medium hover:bg-accent py-2 px-4 rounded-md ease-in-out duration-200"
                  >
                    Lost & Found
                  </Link>
                  <Link
                    href="/adopt"
                    className="text-primary text-sm font-medium hover:bg-accent py-2 px-4 rounded-md ease-in-out duration-200"
                  >
                    Adopt
                  </Link>
                  <Link
                    href="/community"
                    className="text-primary text-sm font-medium hover:bg-accent py-2 px-4 rounded-md ease-in-out duration-200"
                  >
                    Community
                  </Link>
                  <Link
                    href="/recommendations"
                    className="text-primary text-sm font-medium hover:bg-accent rounded-md ease-in-out duration-200 py-2 px-4"
                  >
                    Recommendations
                  </Link>
                  {currentUser?.type === "PetAdoptionCentre" && (
                    <Link
                      href="/adoption-center"
                      className="text-primary text-sm font-medium hover:bg-accent rounded-md ease-in-out duration-200 py-2 px-4"
                    >
                      Adoption Center
                    </Link>
                  )}

                  <Button className="px-4 py-2 border" variant="ghost">
                    <Link
                      href={!currentUser ? "/auth" : `/profile/${username}`}
                    >
                      <User />
                    </Link>
                  </Button>
                </div>
              </>
            )}
            {session.status !== "authenticated" ? (
              <Button
                className="w-20 px-4"
                onClick={() => router.push("/auth")}
              >
                Sign In
              </Button>
            ) : (
              <Button
                className="w-20 px-4"
                onClick={() => {
                  signOut({ callbackUrl: "/" })
                }}
              >
                Logout
              </Button>
            )}
          </NavigationMenuList>
          <div
            onClick={toggleMenu}
            className="sm:hidden cursor-pointer pl-24 flex items-center space-x-4"
          >
            <Menu size={24} />
            <Button className="px-4 py-2 border" variant="ghost">
              <Link href={!currentUser ? "/auth" : `/profile/${username}`}>
                <User />
              </Link>
            </Button>
          </div>
          <div
            className={
              isOpen
                ? "fixed right-0 top-0 w-[65%] sm:hidden h-screen bg-[#FFECE4] p-10 ease-in duration-500"
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
                <ul className="space-y-4">
                  <li>
                    <div className="flex border rounded-[16px]">
                      <div
                        className="avatar rounded-full min-h-12 min-w-12 bg-white
       text-white font-[700] flex items-center justify-center"
                      >
                        <Image
                          src={currentUser?.image || "/../icon.png"}
                          width={48}
                          height={48}
                          alt="User avatar"
                          className="rounded-full"
                        ></Image>
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
                        Adoption Center
                      </Link>
                    </li>
                  )}

                  {/* <li>
                    <Button
                      className="px-4 py-2 border border-gray-400"
                      variant="ghost"
                    >
                      <Link
                        href={!currentUser ? "/auth" : `/profile/${username}`}
                        onClick={toggleMenu}
                      >
                        <User />
                      </Link>
                    </Button>
                  </li> */}
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
    </div>
  )
}

export default NavBar
