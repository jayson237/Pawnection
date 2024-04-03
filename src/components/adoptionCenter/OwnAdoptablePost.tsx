"use client"

import { cn } from "@/lib/utils"
import { AdoptablePet } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import { buttonVariants } from "../ui/Button"

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
        data.length > 0 ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 sm:gap-6 lg:gap-7 w-full">
            {data.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-gray-400 flex flex-col"
              >
                <div className="w-full relative" style={{ paddingTop: "70%" }}>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
                <div className="px-3.5 py-4">
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <p>
                    {item.type} | {item.gender} | {item.age} year old
                  </p>
                  <Link
                    href={`/adoption-center/manage/${item.id}`}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "mt-4 w-full",
                    )}
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No data</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default OwnAdoptablePost
