"use client"

import Image from "next/image"
import React, { useState } from "react"

import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"

interface Tip {
  id: string
  title: string
  description: string
  icon: string
}

const PetCareTips = () => {
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null)

  const handleTipClick = (id: string) => {
    setExpandedTipId(id)
  }

  const tips = [
    {
      id: "bonding",
      title: "Bonding",
      description:
        "You can build a good relationship with your pets by rewarding them and walking them regularly!",
      icon: "/bonding.svg",
    },
    {
      id: "dog-training",
      title: "Dog Training",
      description:
        "Can be counter-effective if done wrongly. Don't hit your pets if you can't catch them on spot!",
      icon: "/dog_training.svg",
    },
    {
      id: "pet-health",
      title: "Pet Health",
      description:
        "Remember to get your pets vax-ed cyclically. 70% of pet mortality is because of illness!",
      icon: "/pet_health.svg",
    },
  ]

  const expandedTip = tips.find((tip) => tip.id === expandedTipId)

  return (
    <div className="mx-auto w-full max-w-[1480px] md:px-0 px-4">
      <div className="py-[60px] bg-submain rounded-[50px]">
        <HeaderTitle className="max-w-full">Pet Care Tips</HeaderTitle>

        <div className="mt-6 flex flex-col items-center md:flex-row gap-10 justify-center">
          <div className="flex flex-col items-center rounded-[50px] px-10 pt-8 pb-5 max-w-[290px] bg-white">
            <Image
              src="/static/images/bonding.svg"
              alt="bonding"
              width={144}
              height={144}
              className=""
            />

            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-semibold">Bonding</h3>
              <p>
                You can build a good relationship with your pets by rewarding
                them and walking them regularly!
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center rounded-[50px] px-10 pt-8 pb-5 max-w-[290px] bg-white">
            <Image
              src="/static/images/dog-training.svg"
              alt="dog-training"
              width={144}
              height={144}
              className=""
            />

            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-semibold">Dog Training</h3>
              <p>
                Can be counter-effective if done wrongly. Don’t hit your pets if
                you don’t catch them on spot!
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center rounded-[50px] px-10 pt-8 pb-5 max-w-[290px] bg-white">
            <Image
              src="/static/images/pet-health.svg"
              alt="pet-health"
              width={144}
              height={144}
              className=""
            />

            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-semibold">Pet Health</h3>
              <p>
                Remember to get your pets vax-ed cyclically. 70% of pet
                mortality is because of illness!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetCareTips
