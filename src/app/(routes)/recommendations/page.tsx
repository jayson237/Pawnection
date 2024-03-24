// "use client"
import { Button } from "@/components/ui/Button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Footer from "@/components/ui/Footer"
import PetCareTips from "@/components/static/PetCareSection"
import PetFriendlyHangouts from "@/components/static/PetFriendlyHangouts"
import dynamic from "next/dynamic"

export default async function Home() {

  const PetStoreMap = dynamic(
    () => import("@/components/static/PetStoreMap"), // Adjust the path as necessary.
    {
      loading: () => <p>A map is loading...</p>,
      ssr: false // This will prevent server-side rendering for the Map component.
    }
  )

  return (
    <div className="h-full w-full flex flex-col place-content-center place-items-center bg-gray-100">

      


      <section className="flex flex-col items-center justify-center section-2 mt-12" style={{background: "linear-gradient(180deg, #FFBBA9 0%, #FF6236 100%)"}}>
        <div className="flex flex-col items-center justify-center" style={{padding: "60px 100px"}}>
          <div className="flex items-center justify-center">
            <Image
              src="/icon_2.svg"
              alt="Pawnection"
              width={0}
              height={0}
              priority={true}
              className="w-16 h-16 mr-4"
            />
          </div>
          <div className="text-2xl font-bold text-white">We are your pets’ best friends!</div>
          <p className="text-xl text-center mt-4 text-white">
            These recommended places have been vetted through by our devoted team of reviewers, ensuring that each location meets our high standards for quality, ambiance, and overall experience. Our reviewers, passionate about discovering and sharing the best spots for pet-owner bonding, have meticulously evaluated every aspect of these places to guarantee they are not only very helpful but also genuinely enriching for visitors.
          </p>
          <p className="text-lg text-center mt-4 text-white">
            We also do partnership with restaurants and places. But do bear in mind that we always conduct a really intensive background check to make sure they are the bestest places for you and your pets!
          </p>
        </div>

      </section>
      <PetFriendlyHangouts/>
      <PetCareTips/>
      <PetStoreMap/>
    </div>
  )
}
