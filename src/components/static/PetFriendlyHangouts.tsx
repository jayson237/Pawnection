"use client"

import Image from "next/image"
import React from "react"

const PetFriendlyHangouts = () => {
  const hangouts = [
    {
      id: "dog-park",
      title: "Dog Park",
      location: "Central Park",
      description:
        "A spacious dog park where your furry friend can run and play freely.",
      contact: "John",
      avatar: "/avatar-user.svg",
      image: "/cat.png",
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
      image: "/cat.png",
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
      image: "/cat.png",
      tags: ["Spa Treatments", "Nail Trimming"],
    },
    {
      id: "dog-park-2",
      title: "Dog Park",
      location: "Central Park",
      description:
        "A spacious dog park where your furry friend can run and play freely.",
      contact: "John",
      avatar: "/avatar-user.svg",
      image: "/cat.png",
      tags: ["Outdoor", "Off-leash"],
    },
    {
      id: "pet-friendly-cafe-2",
      title: "Pet-friendly Cafe",
      location: "Downtown",
      description:
        "Enjoy a cup of coffee or a meal with your pet by your side in a cozy environment.",
      contact: "Jane",
      avatar: "/avatar-user.svg",
      image: "/cat.png",
      tags: ["Indoor", "Pet Menu"],
    },
    {
      id: "pet-grooming-salon-2",
      title: "Pet Grooming Salon",
      location: "Beachside",
      description:
        "Treat your pet to a relaxing grooming session with professional groomers.",
      contact: "Sarah",
      avatar: "/avatar-user.svg",
      image: "/cat.png",
      tags: ["Spa Treatments", "Nail Trimming"],
    },
  ]

  return (
    <div className="bg-white py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-10">
        Recommended Pet-Friendly Hangouts
      </h2>
      <div className="flex flex-wrap justify-center gap-y-10 gap-x-60">
        {hangouts.map((hangout, index) => (
          <div key={index} className="max-w-sm">
            <div className="border p-4 rounded-lg shadow-md ">
              <div className="flex">
                <Image
                  src={hangout.image}
                  alt={hangout.title}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {hangout.title}
                  </h3>
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
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <span className="text-sm">@{hangout.contact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PetFriendlyHangouts
