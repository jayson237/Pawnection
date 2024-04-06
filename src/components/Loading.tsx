"use client"

import { Spinner } from "./ui/Spinner"

const Loading = () => {
  return (
    <div className="flex items-center mt-8">
      <Spinner />
      <p className="font-semibold text-2xl ml-2">Loading...</p>
    </div>
  )
}

export default Loading
