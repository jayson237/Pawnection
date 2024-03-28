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
    <>
      <WelcomeSection />
      <PetTipsAdvice />
      <TestimonialsSection />
      <FeaturedPets />
      <LostAndFoundForm />
      <LatestPetStories />
      <PetSittingSection />
      <HomePetHangout />
    </>
  )
}
