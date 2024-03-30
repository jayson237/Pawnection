import getCurrentUser from "@/actions/getCurrentUser"
import HeaderTitle from "@/components/HeaderTitle"
import FeaturedCard from "@/components/adoption/FeaturedCard"
import HowtoCard from "@/components/adoption/HowToCard"
import { Button } from "@/components/ui/Button"
import { PetGender } from "@/types"
import { redirect } from "next/navigation"

export default async function Adopt() {
  const currentUser = await getCurrentUser()
  if (!currentUser?.type) redirect("/auth/type")
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px]">
        <div className="mx-auto flex flex-col items-center">
          <HeaderTitle description="Browse through the profiles and find your new furry friend!">
            Welcome to the Adopotion Center
          </HeaderTitle>
        </div>
      </div>

      <div className="py-[60px]">
        <div className="grid grid-cols-2 items-center">
          <div>
            <HeaderTitle className="text-left">Featured Pets</HeaderTitle>
            <Button className="mt-4">View All Pets</Button>
          </div>

          <div className="flex flex-rows gap-4">
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
          <HeaderTitle>How to Adopt</HeaderTitle>
          <Button className="mt-4">Learn More</Button>
        </div>

        <div className="gap-10 grid grid-cols-2 py-7 mt-6">
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
