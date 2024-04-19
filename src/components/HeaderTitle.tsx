"use client"

import { cn } from "../lib/utils"

function HeaderTitle({
  children,
  className,
  description,
  descriptionClassName,
  onClick
}: {
  children: React.ReactNode
  className?: string
  description?: string
  descriptionClassName?: string
  onClick?: () => void; 
}) {
  return (
    <div  onClick={onClick}> 

      <h1
        className={cn(
          "text-4xl leading-[-1.2%] font-extrabold max-w-lg text-center",
          className,
        )}
      >
        {children}
      </h1>
      {description && (
        <p
          className={cn(
            "text-xl mt-2 text-center max-w-lg",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default HeaderTitle
