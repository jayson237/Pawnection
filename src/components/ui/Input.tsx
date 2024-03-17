"use client"

import { Icons } from "@/components/Icons"
import { cn } from "@/lib/utils"
import * as React from "react"
import { useState } from "react"
import { type FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errors, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputType = type === "password" && showPassword ? "text" : type

    return (
      <div className="relative">
        <div className="peer">
          <input
            type={inputType}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white",
              className,
              errors?.[props.id as string] &&
                "focus-visible:invalid:ring-red-400 invalid:border-red-400 focus-visible:ring-offset-2 border-red-400 focus-visible:ring-red-400 ring-red-400 ring-offset-2 ring-red-400",
            )}
            ref={ref}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Icons.eye className="h-4 w-4 text-gray-500 hover:text-gray-800" />
              ) : (
                <Icons.eyeOff className="h-4 w-4 text-gray-500 hover:text-gray-800" />
              )}
            </button>
          )}
        </div>
      </div>
    )
  },
)

Input.displayName = "Input"

export { Input }
