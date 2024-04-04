"use client"

import Image from "next/image"

function HowtoCard({
  imagePath,
  title,
  description,
}: {
  imagePath: string
  title: string
  description: string
}) {
  return (
    <div className="border rounded-lg bg-white shadow-md p-4 flex flex-row gap-4">
      <Image
        src={imagePath}
        className="h-full bg-cover bg-center border border-gray-200 object-cover max-h-[100px] w-[100px]"
        width={100}
        height={100}
        alt="featured1"
      />

      <div className="space-y-2">
        <h4 className="text-lg">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default HowtoCard
