"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"

const LostAndFound = () => {
  const router = useRouter()
  return (
    <div className="grid grid-cols-2 space-x-12 py-20 px-20">
      <Image
        width={590}
        height={520}
        src="/home/dog_luggage.webp"
        alt="Lost and found pet"
        className="w-full"
      />
      <div className="flex flex-col justify-center">
        <HeaderTitle className="text-5xl text-left">Lost and Found</HeaderTitle>
        <p className="text-lg py-5 mt-10">
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
