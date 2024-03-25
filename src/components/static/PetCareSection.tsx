"use client"
import Image from "next/image"
import React, { useState } from "react"

import HeaderTitle from "../HeaderTitle"

interface Tip {
  id: string
  title: string
  description: string
  icon: string
}

const PetCareTips = () => {
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null)

  const handleTipClick = (id: string) => {
    // Toggle the expanded state for the clicked tip
    setExpandedTipId(expandedTipId === id ? null : id)
  }

  const tips = [
    {
      id: "bonding",
      title: "Bonding",
      description:
        "You can build a good relationship with your pets by rewarding them and walking them regularly!",
      icon: "/static/images/bonding.svg",
    },
    {
      id: "dog-training",
      title: "Dog Training",
      description:
        "Can be counter-effective if done wrongly. Don't hit your pets if you can't catch them on spot!",
      icon: "/static/images/dog-training.svg",
    },
    {
      id: "pet-health",
      title: "Pet Health",
      description:
        "Remember to get your pets vax-ed cyclically. 70% of pet mortality is because of illness!",
      icon: "/static/images/pet-health.svg",
    },
  ]

  return (
    <div className="mx-auto w-full max-w-[1480px] md:px-0 px-4">
      <div className="py-[60px] bg-submain rounded-[50px]">
        <HeaderTitle className="max-w-full">Pet care tips</HeaderTitle>

        <div className={`mt-6 flex gap-10 justify-center flex-wrap ${expandedTipId ? "items-start" : "items-center"}`}>
          {tips.map((tip) => (
            <div
              key={tip.id}
              className={`flex flex-col items-center rounded-[50px] px-10 pt-8 pb-5 ${expandedTipId ? (expandedTipId === tip.id ? "max-w-[580px]" : "hidden") : "max-w-[290px]"} bg-white transition-all duration-300 ease-in-out`}
              onClick={() => handleTipClick(tip.id)}
            >
              <Image
                src={tip.icon}
                alt={tip.title}
                width={expandedTipId === tip.id ? 288 : 144}
                height={expandedTipId === tip.id ? 288 : 144}
              />
              <div className="space-y-6 text-center">
                <h3 className="text-2xl font-semibold">{tip.title}</h3>
                <p>{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PetCareTips