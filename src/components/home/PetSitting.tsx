"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"

const PetSitting = () => {
  const router = useRouter()
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-12 space-y-6 py-20 px-20 max-md:items-start items-center">
      <Image
        width={520}
        height={396}
        src="/home/cat_pink.webp"
        alt="Pet sitting"
        className="w-full sm:w-5/6 md:mx-auto"
      />
      <div className="flex flex-col justify-center">
        <HeaderTitle className="text-5xl text-left max-md:mt-7">
          Pet Sitting
        </HeaderTitle>
        <p className="text-lg py-5 mt-2">
          Browse through the list of pets looking for a sitter, there may be
          Golden Retriever, British Shorthair, or Parrot waiting for you!
        </p>
        <Button className="w-40" onClick={() => router.push("/adopt")}>
          View More
        </Button>
      </div>
    </div>
  )
}

export default PetSitting
