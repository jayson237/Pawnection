"use client"

import React from "react"

import { cn } from "../../lib/utils"

function HeaderTitle({
  children,
  className,
  description,
  descriptionClassName,
}: {
  children: React.ReactNode
  className?: string
  description?: string
  descriptionClassName?: string
}) {
  return (
    <>
      <h1
        className={cn(
          "text-5xl leading-[-1.2%] font-extrabold max-w-lg text-center",
          className,
        )}
      >
        {children}
      </h1>
      {description && (
        <p
          className={cn(
            "text-xl mt-6 text-center max-w-lg",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </>
  )
}

export default HeaderTitle
