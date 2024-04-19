"use client"

import { useToast } from "@/hooks/useToast"
import axios, { type AxiosError } from "axios"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form"

import HeaderTitle from "../HeaderTitle"
import { Icons } from "../Icons"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Spinner } from "../ui/Spinner"

type Variant = "LOGIN" | "REGISTER"

const AuthForm = () => {
  const { toast } = useToast()
  const session = useSession()
  const router = useRouter()
  const params = useSearchParams()
  const [variant, setVariant] = useState<Variant>("LOGIN")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/")
    }
  }, [session?.status, router])

  useEffect(() => {
    if (params?.get("error") === "OAuthAccountNotLinked") {
      toast({
        variant: "destructive",
        title: "Your email has been registered with a different signin method",
      })
    }
  }, [params])

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
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === "REGISTER") {
      if (data.password !== data.password2) {
        toast({
          variant: "destructive",
          title: "Passwords do not match",
          description: "Please ensure your passwords match",
        })
        return setIsLoading(false)
      }
      axios
        .post("/api/user/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            callbackUrl: "/auth/type",
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
            router.push("/auth/type")
          }
        })
        .catch((err: AxiosError<{ msg: string }>) => {
          toast({
            variant: "destructive",
            title: "An error occured",
            description: err.response?.data?.msg || "Please try again",
          })
        })
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
    signIn(action, { redirect: false, callbackUrl: "/auth/type" })
      .then((callback) => {
        if (callback?.error) {
          return toast({
            variant: "destructive",
            title: "Invalid credentials",
            description: "Ensure your login details are correct and try again",
          })
        }

        if (callback?.ok) {
          router.push("/auth/type")
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1">
      <div className="order-last sm:order-first">
        <Image
          src="/static/images/dog_left.webp"
          alt="hura"
          width={604}
          height={400}
          layout="responsive"
        />
      </div>

      <div className="flex flex-col justify-between overflow-y-auto py-3 md:py-2 rounded-lg px-6 md:px-4 w-full md:w-3/4">
        {variant === "REGISTER" ? (
          <HeaderTitle className="max-w-full max-lg:text-2xl">
            Sign Up
          </HeaderTitle>
        ) : (
          <HeaderTitle className="max-w-full max-lg:text-2xl">
            Sign in
          </HeaderTitle>
        )}

        <form
          className="space-y-6 pt-6 max-lg:space-y-4 max-lg:pt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === "REGISTER" && (
            <>
              <div className="space-y-1 max-lg:space-y-0">
                <Label htmlFor="text">Username</Label>
                <Input
                  id="username"
                  type="text"
                  disabled={isLoading}
                  {...register("username", {
                    required: variant === "REGISTER",
                  })}
                  errors={errors}
                  placeholder="Enter your username"
                />
              </div>
            </>
          )}
          <div className="space-y-1 max-lg:space-y-0">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              disabled={isLoading}
              {...register("email", { required: true })}
              errors={errors}
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-1 max-lg:space-y-0">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              disabled={isLoading}
              {...register("password", { required: true })}
              errors={errors}
              placeholder="Enter your password"
            />
          </div>
          {variant === "REGISTER" && (
            <div className="space-y-1 max-lg:space-y-0">
              <Label htmlFor="password2">Confirm Password</Label>
              <Input
                id="password2"
                type="password"
                disabled={isLoading}
                {...register("password2", { required: variant === "REGISTER" })}
                errors={errors}
                placeholder="Re-enter your password"
              />
            </div>
          )}
          {variant === "REGISTER" ? (
            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading ||
                !isValid ||
                Object.values(errors).filter((e) => e !== undefined).length > 0
              }
            >
              {isLoading ? (
                <>
                  <Spinner />
                </>
              ) : (
                "Register"
              )}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !isValid}
            >
              {isLoading ? (
                <>
                  <Spinner />
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          )}
        </form>

        <div className="mt-4">
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
              <span className="bg-main px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
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
            mt-4
            px-2
            text-gray-500"
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
  )
}

export default AuthForm
