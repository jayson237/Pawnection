"use client"

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button, buttonVariants } from "./ui/Button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/NavMenu"

function NavBar() {
  const router = useRouter()
  const session = useSession()

  return (
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
              <div className="flex gap-10 items-center">
                <Link
                  href="/profile"
                  className="text-primary text-sm font-medium hover:bg-accent px-4 py-2 rounded-md ease-in-out duration-200"
                >
                  Profile
                </Link>
                <Link
                  href="/lost-and-found"
                  className="text-primary text-sm font-medium hover:bg-accent px-4 py-2 rounded-md ease-in-out duration-200"
                >
                  Lost & Found
                </Link>
                <Link
                  href="/adopt"
                  className="text-primary text-sm font-medium hover:bg-accent px-4 py-2 rounded-md ease-in-out duration-200"
                >
                  Adopt
                </Link>
                <Link
                  href="/community"
                  className="text-primary text-sm font-medium hover:bg-accent px-4 py-2 rounded-md ease-in-out duration-200"
                >
                  Community
                </Link>
                <Link
                  href="/recommendations"
                  className="text-primary text-sm font-medium hover:bg-accent px-4 py-2 rounded-md ease-in-out duration-200"
                >
                  Recommendations
                </Link>
              </div>
            </>
          )}

          {session.status !== "authenticated" ? (
            <Button className="w-20 px-4" onClick={() => router.push("/auth")}>
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
      </NavigationMenu>
    </div>
  )
}

export default NavBar
