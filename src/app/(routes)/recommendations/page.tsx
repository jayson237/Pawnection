// "use client"
import PetCareTips from "@/components/recommendation/PetCareSection"
import PetFriendlyHangouts from "@/components/recommendation/PetFriendlyHangouts"
import { Button } from "@/components/ui/Button"
import Footer from "@/components/ui/Footer"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter } from "next/navigation"

import HeaderTitle from "../../../components/HeaderTitle"

export default async function Home() {
  const PetStoreMap = dynamic(
    () => import("@/components/recommendation/PetStoreMap"), // Adjust the path as necessary.
    {
      loading: () => <p>A map is loading...</p>,
      ssr: false, // This will prevent server-side rendering for the Map component.
    },
  )

  return (
    <section>
      <div
        className="py-[60px]"
        style={{
          background: "linear-gradient(180deg, #FFBBA9 0%, #FF6236 100%)",
        }}
      >
        <div className="space-y-6 flex flex-col items-center justify-center w-full max-w-[1240px] mx-auto md:px-0 px-4">
          <div className="flex items-center justify-center">
            <Image
              src="/icon_2.svg"
              alt="Pawnection"
              width={0}
              height={0}
              priority={true}
              className="w-[100px] h-[100px] mr-4"
            />
          </div>
          <HeaderTitle
            className="text-white max-w-full"
            descriptionClassName="text-white max-w-full mt-6 leading-2"
            description="These recommended places have been vetted through by our devoted team of reviewers, ensuring that each location meets our high standards for quality, ambiance, and overall experience. Our reviewers, passionate about discovering and sharing the best spots for pet-owner bonding, have meticulously evaluated every aspect of these places to guarantee they are not only very helpful but also genuinely enriching for visitors.

            We also do partnership with restaurants and places. But do bear in mind that we always conduct a really intensive background check to make sure they are the bestest places for you and your pets!"
          >
            We are your pets&apos; best friends!
          </HeaderTitle>
        </div>
      </div>

      <PetFriendlyHangouts />
      <PetCareTips />
      <PetStoreMap />
    </section>
  )
}
