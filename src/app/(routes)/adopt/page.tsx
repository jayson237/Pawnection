import HeaderTitle from "@/components/HeaderTitle"
import FeaturedCard from "@/components/adopt/FeaturedCard"
import HowtoCard from "@/components/adopt/HowToCard"
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
            className="max-w-[fit-content] mx-auto text-center max-md:text-2xl lg:py-3"
            descriptionClassName="max-md:text-lg "
            description="Browse through the profiles and find your new furry friend!"
          >
            Welcome to the Adoption Center
          </HeaderTitle>
          <Link
            className={cn(buttonVariants({ variant: "default" }), "mt-4")}
            href="/adopt/requests"
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
              href="/adopt/pets"
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
          <h3 className="text-lg text-mainAccent font-semibold leading-8 tracking-tight text-center py-6 max-md:px-4">
            Disclaimer: The following steps are conducted between the adoptee
            and the adoption agency!
          </h3>
        </div>

        <div className="gap-10 grid sm:grid-cols-2 grid-cols-1 py-7 px-4">
          <HowtoCard
            imagePath="/static/images/findpet.png"
            title="Find a Pet"
            description="Browse through the profiles and find your new furry friend!"
          />
          <HowtoCard
            imagePath="/static/images/contact.png"
            title="Contact the Agency"
            description="Reach out to the adpotion agency to enquire about the pet and arrange a meeting."
          />
          <HowtoCard
            imagePath="/static/images/meetthepet.png"
            title="Meet the Pet"
            description="Visit the agency and spend time with the pet to ensure compatibility."
          />
          <HowtoCard
            imagePath="/static/images/completeprocess.png"
            title="Complete the Adoption Process"
            description="Provide the necessary documentation and pay adoption fees to finalize the process."
          />
        </div>
      </div>
    </div>
  )
}
