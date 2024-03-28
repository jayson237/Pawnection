"use client"

import { SafeUser } from "@/types"
import { User } from "lucide-react"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "./ui/Button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/NavMenu"

function NavBar({ currentUser }: { currentUser?: SafeUser | null }) {
  const router = useRouter()
  const session = useSession()
  const username = currentUser?.username

  return (
    <div className="sticky top-0 z-[100] flex w-full place-content-between px-12 py-4 drop-shadow md:px-24 items-center border-b bg-main">
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
                  <Link href={!currentUser ? "/auth" : `/profile/${username}`}>
                    <User />
                  </Link>
                </Button>
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
