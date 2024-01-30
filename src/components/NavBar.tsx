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
    <div className="sticky top-0 z-[100] flex w-full place-content-between bg-white px-12 py-4 drop-shadow md:px-24">
      <Image
        src=""
        alt="Pawnection"
        priority={true}
        width="0"
        height="0"
        style={{ width: "auto", height: "40px" }}
        className="cursor-pointer"
        onClick={() => {
          router.push("/")
        }}
      />
      <NavigationMenu>
        <NavigationMenuList className="hidden sm:flex">
          {session.status === "authenticated" && (
            <>
              {/* <NavigationMenuItem>
                <Link href="/profile">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    My Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem> */}
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
