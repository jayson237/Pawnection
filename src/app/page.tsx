import WelcomeSection from "@/components/Home/WelcomeSection"
import PetTipsAdvice from "@/components/Home/PetTipsAdvice"
import TestimonialsSection from "@/components/Home/TestimonialsSection"
import FeaturedPets from "@/components/Home/FeaturedPets"
import LostAndFoundForm from "@/components/Home/LostAndFoundForm"
import LatestPetStories from "@/components/Home/StoryCard"
import PetSittingSection from "@/components/Home/PetSittingSection"
import HomePetHangout from "@/components/Home/HomePetHangout"

export default async function Home() {
  return (
    // <div className="h-full w-full flex flex-col place-content-center place-items-center">
    //   Homessss
    // </div>
    // eslint-disable-next-line react/jsx-no-undef
    <>
      <WelcomeSection></WelcomeSection>
      <PetTipsAdvice/>
      <TestimonialsSection/>
      <FeaturedPets/>
      <LostAndFoundForm/>
      <LatestPetStories/>
      <PetSittingSection/>
      <HomePetHangout/>
    </>
  )
}
