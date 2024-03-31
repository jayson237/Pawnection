"use client"

import Image from "next/image"
import React from "react"

import HeaderTitle from "../HeaderTitle"

const HomePetHangout = () => {
  const hangouts = [
    {
      id: "dog-park",
      title: "Dog Park",
      location: "Central Park",
      description:
        "A spacious dog park where your furry friend can run and play freely.",
      contact: "John",
      avatar: "/avatar-user.svg",
      image: "/home/bright_ferris.svg",
      tags: ["Outdoor", "Off-leash"],
    },
    {
      id: "pet-friendly-cafe",
      title: "Pet-friendly Cafe",
      location: "Downtown",
      description:
        "Enjoy a cup of coffee or a meal with your pet by your side in a cozy environment.",
      contact: "Jane",
      avatar: "/avatar-user.svg",
      image: "/home/dark_ferris.svg",
      tags: ["Indoor", "Pet Menu"],
    },
    {
      id: "pet-grooming-salon",
      title: "Pet Grooming Salon",
      location: "Beachside",
      description:
        "Treat your pet to a relaxing grooming session with professional groomers.",
      contact: "Sarah",
      avatar: "/avatar-user.svg",
      image: "/home/cat_funny.svg",
      tags: ["Spa Treatments", "Nail Trimming"],
    },
  ]

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
                <p className="text-sm mb-2" style={{ color: "#FF7751" }}>
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
                <div className="flex items-center mt-2">
                  <span className="inline-block w-8 h-8 rounded-full overflow-hidden mr-2">
                    <Image
                      src={hangout.avatar}
                      alt={`${hangout.contact}'s avatar`}
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span className="text-sm">@{hangout.contact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePetHangout
