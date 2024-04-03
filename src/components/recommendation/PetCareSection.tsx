"use client"

import React, { useState } from "react"

import HeaderTitle from "../HeaderTitle"
import { Icons } from "../Icons"

const PetCareTips = () => {
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null)

  const handleTipClick = (id: string) => {
    setExpandedTipId(expandedTipId === id ? null : id)
  }

  const tips = [
    {
      id: "bonding",
      title: "Bonding",
      message: "The secret to a stronger bond with your pet",
      description:
        "You can build a good relationship with your pets by rewarding them and walking them regularly!",
    },
    {
      id: "dog-training",
      title: "Dog Training",
      message: "The right way to train your dog",
      description:
        "Can be counter-effective if done wrongly. Don't hit your pets if you can't catch them on spot!",
    },
    {
      id: "pet-health",
      title: "Pet Health",
      message: "How to drastically reduce your pet's risk of illness",
      description:
        "Remember to get your pets vax-ed cyclically. 70% of pet mortality is because of illness!",
    },
  ]

  return (
    <div className="mx-auto w-full max-w-[1480px] px-8">
      <div className="py-[60px] bg-submain rounded-[50px]">
        <HeaderTitle className="max-w-full text-3xl md:text-4xl">
          Pet Care Tips
        </HeaderTitle>

        <div
          className={`mt-6 flex gap-10 justify-center flex-wrap ${expandedTipId ? "items-start" : "items-center"}`}
        >
          {tips.map((tip) => (
            <div
              key={tip.id}
              className={`flex flex-col items-center rounded-[50px] px-10 pt-8 pb-5 ${expandedTipId ? (expandedTipId === tip.id ? "max-w-[580px]" : "hidden") : "max-w-[290px]"} bg-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg hover:scale-105 hover:z-10`}
              onClick={() => handleTipClick(tip.id)}
            >
              {tip.title === "Bonding" && (
                <Icons.bonding className="w-12 h-12" />
              )}
              {tip.title === "Dog Training" && (
                <Icons.dogTraining className="w-12 h-12" />
              )}
              {tip.title === "Pet Health" && (
                <Icons.petHealth className="w-12 h-12" />
              )}

              <div className="space-y-6 text-center">
                <h3 className="text-2xl font-semibold">{tip.title}</h3>
                {expandedTipId && expandedTipId === tip.id ? (
                  <p>{tip.description}</p>
                ) : (
                  <p>{tip.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PetCareTips
