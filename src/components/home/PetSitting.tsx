"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"

const PetSitting = () => {
  const router = useRouter()
  return (
    <div className="grid grid-cols-2 space-x-12 py-20 px-20">
      <div className="flex flex-col justify-center">
        <HeaderTitle className="text-5xl text-left">Pet Sitting</HeaderTitle>
        <p className="text-lg py-5 mt-10">
          Browse through the list of pets looking for a sitter, there may be
          Golden Retriever, British Shorthair, or Parrot waiting for you!
        </p>
        <Button className="w-40" onClick={() => router.push("/adopt")}>
          View More
        </Button>
      </div>
      <Image
        width={520}
        height={396}
        src="/home/cat_pink.webp"
        alt="Pet sitting"
        className="w-full"
      />
    </div>
  )
}

export default PetSitting
