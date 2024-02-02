"use client"

import { useToast } from "@/hooks/useToast"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "../ui/Button"
import LoadingDots from "../ui/LoadingDots"

const TypeForm = () => {
  const { toast } = useToast()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    num: number,
  ) => {
    e.preventDefault()
    setIsLoading(true)
    const set = await fetch("/api/user/register/type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(num),
    })
    const msg = await set.json()
    setIsLoading(false)
    if (!set.ok) {
      return toast({
        variant: "destructive",
        title: `${msg.message}`,
        description: "Please try again",
      })
    } else {
      router.push("/")
      return toast({
        title: `${msg.message}`,
      })
    }
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
    bg-white
      py-6
      shadow
      rounded-lg
      px-8
      space-y-4
    "
      >
        <p
          className="mb-6 text-center text-lg font-bold tracking-tight text-gray-900
          "
        >
          I am a...
        </p>
        <div className="flex flex-row space-x-2 my-8">
          <Button
            className="bg-white border-b-gray-700 border-2 hover:bg-slate-100 w-full h-40 rounded-sm text-center font-semibold text-[12px] disabled:opacity-80 flex flex-col text-black"
            onClick={(e) => onSubmit(e, 1)}
            disabled={isLoading}
          >
            Pet lover
            <Image
              src="/dog-lover.svg"
              alt="Pet lover"
              width={0}
              height={0}
              className="w-28 h-28 mx-auto"
            />
          </Button>
          <Button
            className="bg-white border-b-gray-700 border-2 hover:bg-slate-100 w-full h-40 rounded-sm text-center font-semibold text-[12px] disabled:opacity-80 flex flex-col text-black"
            onClick={(e) => onSubmit(e, 2)}
            disabled={isLoading}
          >
            <p className="pb-4">Pet adoption centre</p>
            <Image
              src="/centre.svg"
              alt="Pet adoption centre"
              width={0}
              height={0}
              className="w-24 h-24 mx-auto"
            />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TypeForm
