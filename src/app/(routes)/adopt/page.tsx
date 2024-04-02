import HeaderTitle from "@/components/HeaderTitle"
import FeaturedCard from "@/components/adoption/FeaturedCard"
import HowtoCard from "@/components/adoption/HowToCard"
import { Button, buttonVariants } from "@/components/ui/Button"
import { getCurrentUser } from "@/lib/actions/user"
import { cn } from "@/lib/utils"
import { PetGender } from "@/types"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Adopt() {
  const currentUser = await getCurrentUser()
  if (!currentUser?.type) redirect("/auth/type")
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px]">
        <div className="mx-auto flex flex-col items-center">
          <HeaderTitle
            className="max-md:text-2xl"
            descriptionClassName="max-md:text-lg"
            description="Browse through the profiles and find your new furry friend!"
          >
            Welcome to the Adoption Center
          </HeaderTitle>

          <Link
            href="/adopt/requests"
            className={cn(buttonVariants({ variant: "default" }), "mt-6")}
          >
            View all your requests
          </Link>
        </div>
      </div>

      <div className="py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center px-10 gap-3">
          <div className="flex flex-col items-center text-center md:text-left ">
            <HeaderTitle className="text-center md:text-left max-md:text-2xl">
              Featured Pets
            </HeaderTitle>
            <Link
              href="/adopt/all-pets"
              className={cn("my-6", buttonVariants({ variant: "default" }))}
            >
              View All Pets
            </Link>
          </div>

          <div className="flex flex-col items-center md:flex-row gap-6">
            <FeaturedCard
              imagePath="/static/images/featured-1.png"
              petName="Buddy"
              petAge="2"
              petGender={PetGender.male}
            />
            <FeaturedCard
              imagePath="/static/images/featured-2.png"
              petName="Whiskers"
              petAge="1"
              petGender={PetGender.female}
            />
          </div>
        </div>
      </div>

      <div className="py-[60px]">
        <div className="flex flex-col items-center">
          <HeaderTitle className="max-md:text-2xl">How to Adopt</HeaderTitle>
          <Button className="mt-4">Learn More</Button>
        </div>

        <div className="gap-10 grid sm:grid-cols-2 grid-cols-1 py-7 mt-6 px-4">
          <HowtoCard
            imagePath="/static/images/featured-1.png"
            title="Find a Pet"
            description="Browse through the profiles and find your new furry friend!"
          />
          <HowtoCard
            imagePath="/static/images/featured-1.png"
            title="Find a Pet"
            description="Browse through the profiles and find your new furry friend!"
          />
          <HowtoCard
            imagePath="/static/images/featured-1.png"
            title="Find a Pet"
            description="Browse through the profiles and find your new furry friend!"
          />
          <HowtoCard
            imagePath="/static/images/featured-1.png"
            title="Find a Pet"
            description="Browse through the profiles and find your new furry friend!"
          />
        </div>
      </div>
    </div>
  )
}
