import FeaturedPets from "@/components/home/FeaturedPets"
import HomePetHangout from "@/components/home/HomePetHangout"
import LostAndFoundForm from "@/components/home/LostAndFoundForm"
import PetSittingSection from "@/components/home/PetSittingSection"
import PetTipsAdvice from "@/components/home/PetTipsAdvice"
import LatestPetStories from "@/components/home/StoryCard"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import WelcomeSection from "@/components/home/WelcomeSection"

export default async function Home() {
  return (
    <div className="w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[60px]">
        <div className="mx-auto flex flex-col items-center">
          <WelcomeSection />
          <PetTipsAdvice />
          <TestimonialsSection />
          <FeaturedPets />
          <LostAndFoundForm />
          <LatestPetStories />
          <PetSittingSection />
          <HomePetHangout />
        </div>
      </div>
    </div>
  )
}
