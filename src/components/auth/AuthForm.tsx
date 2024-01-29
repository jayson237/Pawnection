"use client"

import { useToast } from "@/hooks/useToast"
import axios from "axios"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { Icons } from "../icons"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import AuthSocialButton from "./AuthSocialButton"

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
              title: "Invalid credentials",
              description:
                "Ensure your login details are correct and try again",
            })
          }

          if (callback?.ok) {
            router.push("/")
          }
        })
        .catch(() =>
          toast({
            variant: "destructive",
            title: "Something went wrong!",
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
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <>
              <Label />
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="name"
              />
            </>
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            type="password"
          />
          <div>
            <Button disabled={isLoading} type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
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
            <AuthSocialButton
              icon={Icons.apple}
              onClick={() => socialAction("apple")}
            />
            <AuthSocialButton
              icon={Icons.google}
              onClick={() => socialAction("google")}
            />
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
              ? "New to Messenger?"
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
