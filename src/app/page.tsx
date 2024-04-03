import LostAndFound from "@/components/home/LostAndFound"
import PetSitting from "@/components/home/PetSitting"
import FeaturedPets from "@/components/home/featuredPets/FeaturedPets"
import FeaturedPosts from "@/components/home/featuredPosts/FeaturedPosts"
import PetTips from "@/components/home/petTips/PetTips"
import Testimonials from "@/components/home/testimonials/Testimonials"
import WelcomeSection from "@/components/home/welcome/WelcomeSection"
import PetFriendlyHangouts from "@/components/recommendation/PetFriendlyHangouts"

const hangouts = [
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

export default async function Home() {
  return (
    <div className="w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[60px]">
        <div className="mx-auto flex flex-col items-center">
          <WelcomeSection />
          <PetTips />
          <Testimonials />
          <FeaturedPets />
          <LostAndFound />
          <FeaturedPosts />
          <PetSitting />
          <PetFriendlyHangouts hangouts={hangouts} />
        </div>
      </div>
    </div>
  )
}
