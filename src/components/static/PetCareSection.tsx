"use client"

import Image from "next/image"
import React, { useState } from "react"

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
    <div className="bg-pink-100 rounded-lg p-20">
      <h2 className="text-center text-3xl font-semibold mb-10">
        Pet care tips
      </h2>
      <div className="flex flex-col items-center">
        {expandedTipId == null ? (
          tips.map((tip) => (
            <button
              key={tip.id}
              className="bg-white p-4 rounded-xl shadow-lg mb-4 w-1/3"
              onClick={() => handleTipClick(tip.id)}
            >
              <Image
                src={tip.icon}
                alt={`${tip.title} icon`}
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className="text-lg font-semibold">{tip.title}</h3>
            </button>
          ))
        ) : (
          <div
            key={expandedTip?.id}
            className="bg-white p-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out"
            onClick={() => setExpandedTipId(null)}
          >
            <Image
              src={expandedTip?.icon || ""}
              alt={`${expandedTip?.title} icon`}
              width={60}
              height={60}
              className="mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{expandedTip?.title}</h3>
            <p className="text-sm text-center">{expandedTip?.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PetCareTips
