"use client"

import Image from "next/image"
import React from "react"

import HeaderTitle from "../HeaderTitle"

interface HangoutLocation {
  id: string
  title: string
  location: string
  description: string
  image: string
  tags: string[]
}

const PetFriendlyHangouts = ({ hangouts }: { hangouts: HangoutLocation[] }) => {
  return (
    <div className="space-y-6 flex flex-col items-center justify-center w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[60px]">
        <HeaderTitle className="max-w-full">
          Recommended Pet-Friendly Hangouts
        </HeaderTitle>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
          {hangouts.map((hangout, index) => (
            <div
              key={index}
              className="flex border p-4 rounded-xl bg-white h-full"
            >
              <Image
                src={hangout.image}
                alt={hangout.title}
                width={1200}
                height={1200}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold mb-1">{hangout.title}</h3>
                <p className="text-sm mb-2 text-mainAccent">
                  Location: {hangout.location}
                </p>
                <p className="text-sm mb-3">{hangout.description}</p>
                <div className="flex flex-wrap">
                  {hangout.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs mr-2 mb-2 py-1 px-3 rounded-lg bg-gray-50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PetFriendlyHangouts
