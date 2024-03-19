"use client"

import { useToast } from "@/hooks/useToast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form"

import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import LoadingDots from "../ui/LoadingDots"

const UsernameForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    const set = await fetch("/api/user/register/username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: data.username }),
    })
    const msg = await set.json()
    setIsLoading(false)
    if (!set.ok) {
      return toast({
        variant: "destructive",
        title: `${msg.message}`,
        description:
          "Please try again and make sure there are no special characters for the username",
      })
    } else {
      router.push("/")
      return toast({
        title: `${msg.message}`,
      })
    }
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-6 shadow rounded-lg px-8 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="mb-6 text-center text-lg font-bold tracking-tight text-gray-900">
            Lastly, provide your username...
          </p>
          <Input
            id="username"
            type="text"
            disabled={isLoading}
            {...register("username", {
              required: true,
              pattern: /^[a-z]{4,20}$/,
            })}
            errors={errors}
            placeholder="Enter your username (4-20 lowercase characters)"
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              Username should be lowercase with a minimum of 4 characters and a
              maximum of 20 characters
            </p>
          )}
          <Button
            type="submit"
            className="w-full mt-8"
            disabled={
              isLoading ||
              !isValid ||
              Object.values(errors).filter((e) => e !== undefined).length > 0
            }
          >
            {isLoading ? (
              <>
                <LoadingDots color="#FAFAFA" />
              </>
            ) : (
              "Let's go"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default UsernameForm
