"use client"

import { useToast } from "@/hooks/useToast"
import axios from "axios"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { Icons } from "../Icons"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import LoadingDots from "../ui/LoadingDots"

type Variant = "LOGIN" | "REGISTER"

const AuthForm = () => {
  const { toast } = useToast()
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>("LOGIN")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/")
    }
  }, [session?.status, router])

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          }),
        )
        .then((callback) => {
          if (callback?.error) {
            return toast({
              variant: "destructive",
              title: "Something went wrong",
              description: "Please try again",
            })
          }

          if (callback?.ok) {
            router.push("/")
          }
        })
        .catch(() =>
          toast({
            variant: "destructive",
            title: "An error occured",
            description: "Please try again",
          }),
        )
        .finally(() => setIsLoading(false))
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            return toast({
              variant: "destructive",
              title: "Invalid credentials",
              description:
                "Ensure your login details are correct and try again",
            })
          }

          if (callback?.ok) {
            router.push("/")
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true)
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          return toast({
            variant: "destructive",
            title: "Invalid credentials",
            description: "Ensure your login details are correct and try again",
          })
        }

        if (callback?.ok) {
          router.push("/")
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <h2
        className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900
          "
      >
        {variant === "REGISTER"
          ? "Register an account"
          : "Sign in to your account"}
      </h2>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className="
        bg-white
          py-8
          shadow
          rounded-lg
          px-8
        "
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <div className="space-y-1">
                <Label htmlFor="text">Name</Label>
                <Input
                  id="name"
                  type="text"
                  disabled={isLoading}
                  {...register("name", { required: true })}
                  errors={errors}
                  required
                />
              </div>
            )}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                disabled={isLoading}
                {...register("email", { required: true })}
                errors={errors}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                disabled={isLoading}
                {...register("password", { required: true })}
                errors={errors}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingDots color="#FAFAFA" />
                </>
              ) : variant === "LOGIN" ? (
                "Sign in"
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div
                className="
                absolute 
                inset-0 
                flex 
                items-center
              "
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                onClick={(e) => {
                  e.preventDefault()
                  socialAction("github")
                }}
              >
                <Icons.github className="h-6 w-6" />
              </Button>
              <Button
                className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                onClick={(e) => {
                  e.preventDefault()
                  socialAction("google")
                }}
              >
                <Icons.google className="h-6 w-6" />
              </Button>
            </div>
          </div>
          <div
            className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
          >
            <div>
              {variant === "LOGIN"
                ? "New to Pawnection?"
                : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthForm
