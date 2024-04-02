"use client"

import Image from "next/image"
import React from "react"

import HeaderTitle from "../HeaderTitle"

const hangouts = [
  {
    id: "katong-park",
    title: "Katong Park",
    location: "59 Fort Rd",
    description:
      "Get active with your pup by bringing them to this dog-friendly park.",
    image: "/katong-park.png",
    tags: ["Outdoor", "Dog-friendly"],
  },
  {
    id: "east-coast-park",
    title: "East Coast Park",
    location: "East Coast Park Service Road",
    description:
      "Let your dogs run safely off-leash and socialise with other furry friends at the dog run at Parkland Green (Area C) or near Xtreme SkatePark (Area F).",
    image: "/east-coast-park.png",
    tags: ["Outdoor", "Off-leash"],
  },
  {
    id: "woodlands-waterfront-park",
    title: "Woodlands Waterfront Park",
    location: "Admiralty Rd West",
    description:
      "Let your furry ones run loose in the big open space within the dog run.",
    image: "/woodlands-waterfront-park.png",
    tags: ["Waterfront", "Open Space"],
  },
  {
    id: "punggol-waterway-park",
    title: "Punggol Waterway Park",
    location: "Sentul Crescent",
    description:
      "Let your dogs run free and mingle with their furry friends at the dog run.",
    image: "/punggol-waterway-park.png",
    tags: ["Waterway", "Dog Run"],
  },
  {
    id: "bedok-town-park",
    title: "Bedok Town Park",
    location: "Bedok North Ave 3",
    description:
      "Set your dog free to sprint or play with other dogs in the dog run.",
    image: "/bedok-town-park.png",
    tags: ["Town Park", "Dog Run"],
  },
  {
    id: "tiong-bahru-park",
    title: "Tiong Bahru Park",
    location: "1 Henderson Rd",
    description:
      "Let your dog run free and socialise with other canines in the enclosed dog run.",
    image: "/tiong-bahru-park.png",
    tags: ["Enclosed", "Socialise"],
  },
]

const PetFriendlyHangouts = () => {
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
                width={60}
                height={60}
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
