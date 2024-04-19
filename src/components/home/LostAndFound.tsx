"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"

const LostAndFound = () => {
  const router = useRouter()
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-12 space-x-2 py-20 px-20 max-md:items-start items-center">
      <Image
        width={590}
        height={520}
        src="/home/dog_luggage.webp"
        alt="Lost and found pet"
        className="w-full"
      />
      <div className="flex flex-col md:ml-0 ml-[-10px]">
        <HeaderTitle className="text-5xl text-left max-md:mt-7">
          Lost and Found
        </HeaderTitle>
        <p className="text-lg py-5 mt-2">
          Have you lost a beloved pet or found one wandering around? Our Lost
          and Found section is here to help reunite pets with their owners.
        </p>
        <Button className="w-40" onClick={() => router.push("/lostAndFound")}>
          Learn More
        </Button>
      </div>
    </div>
  )
}

export default LostAndFound
