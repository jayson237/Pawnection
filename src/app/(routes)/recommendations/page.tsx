import getCurrentUser from "@/actions/getCurrentUser"
import HeaderTitle from "@/components/HeaderTitle"
import PetCareTips from "@/components/recommendation/PetCareSection"
import PetFriendlyHangouts from "@/components/recommendation/PetFriendlyHangouts"
import dynamic from "next/dynamic"
import Image from "next/image"
import { redirect } from "next/navigation"

const hangouts = [
  {
    id: "katong-park",
    title: "Katong Park",
    location: "59 Fort Rd",
    description:
      "Get active with your pup by bringing them to this dog-friendly park.",
    image: "/recommendations/katong.webp",
    tags: ["Outdoor", "Dog-friendly"],
  },
  {
    id: "east-coast-park",
    title: "East Coast Park",
    location: "East Coast Park Service Road",
    description:
      "Let your dogs run safely off-leash and socialise with other furry friends at the dog run at Parkland Green (Area C) or near Xtreme SkatePark (Area F).",
    image: "/recommendations/eastcoast.webp",
    tags: ["Outdoor", "Off-leash"],
  },
  {
    id: "woodlands-waterfront-park",
    title: "Woodlands Waterfront Park",
    location: "Admiralty Rd West",
    description:
      "Let your furry ones run loose in the big open space within the dog run.",
    image: "/recommendations/woodlands.webp",
    tags: ["Waterfront", "Open Space"],
  },
  {
    id: "punggol-waterway-park",
    title: "Punggol Waterway Park",
    location: "Sentul Crescent",
    description:
      "Let your dogs run free and mingle with their furry friends at the dog run.",
    image: "/recommendations/punggol.webp",
    tags: ["Waterway", "Dog Run"],
  },
  {
    id: "bedok-town-park",
    title: "Bedok Town Park",
    location: "Bedok North Ave 3",
    description:
      "Set your dog free to sprint or play with other dogs in the dog run.",
    image: "/recommendations/bedok.webp",
    tags: ["Town Park", "Dog Run"],
  },
  {
    id: "tiong-bahru-park",
    title: "Tiong Bahru Park",
    location: "1 Henderson Rd",
    description:
      "Let your dog run free and socialise with other canines in the enclosed dog run.",
    image: "/recommendations/tiongbahru.webp",
    tags: ["Enclosed", "Socialise"],
  },
]

export default async function Recommendation() {
  const currUser = await getCurrentUser()
  if (!currUser) redirect("/auth")
  const PetHangoutMap = dynamic(
    () => import("@/components/recommendation/PetHangoutMap"),
    {
      loading: () => <p>A map is loading...</p>,
      ssr: false,
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
            description="These recommended tips and places have been vetted through by our devoted team of reviewers, ensuring that each location meets our high standards for quality, ambiance, and overall experience. Our reviewers, passionate about discovering and sharing the best spots for pet-owner bonding, have meticulously evaluated every aspect of these places to guarantee they are not only very helpful but also genuinely enriching for visitors.

            We also do partnership with restaurants and places. But do bear in mind that we always conduct a really intensive background check to make sure they are the bestest places for you and your pets!"
          >
            We are your pets&apos; best friends!
          </HeaderTitle>
        </div>
      </div>

      <PetCareTips />
      <PetFriendlyHangouts hangouts={hangouts} />
      <PetHangoutMap />
    </section>
  )
}
