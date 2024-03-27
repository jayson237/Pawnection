"use client"

import { AdoptablePet } from "@prisma/client"
import Image from "next/image"
import React, { useEffect, useState } from "react"

function OwnAdoptablePost() {
  const [data, setData] = useState<AdoptablePet[] | null>(null)

  useEffect(() => {
    fetch("/api/adoption-center")
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      {data ? (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 w-full">
          {data.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-400 h-full"
            >
              <div>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={1000}
                  height={1000}
                  className="rounded-xl h-full bg-cover bg-center w-full object-cover max-h-[440px]"
                />
              </div>
              <div className="px-3.5 py-4">
                <h4 className="font-bold text-lg">{item.name}</h4>
                <p>
                  {item.type} | {item.gender} | {item.age} year old
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default OwnAdoptablePost
