"use client"

import { useToast } from "@/hooks/useToast"
import { SafeUser } from "@/types"
import Image from "next/image"
import { FormEvent, useState } from "react"

import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import LoadingDots from "../ui/LoadingDots"

interface SettingsProps {
  currentUser?: SafeUser | null
}

const Settings: React.FC<SettingsProps> = ({ currentUser }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [name, setName] = useState(currentUser?.name || "")
  const [username, setUsername] = useState(currentUser?.username || "")
  const [phone, setPhone] = useState(currentUser?.phone || "")
  const [image, setImage] = useState(
    currentUser?.image ||
      `${
        currentUser?.image?.split("/image/upload/")[0]
      }/image/upload/c_fill,h_160,w_160/${
        currentUser?.image?.split("/image/upload/")[1]
      }` ||
      "/../icon.png",
  )
  const [isUsernameValid, setIsUsernameValid] = useState(true)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isFormChanged, setIsFormChanged] = useState(false)

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    event.preventDefault()

    try {
      const updateResponse = await fetch("/api/user/updateProfile", {
        method: "PUT",
        body: JSON.stringify({
          name,
          username,
          phone,
        }),
      })

      if (!updateResponse.ok) {
        toast({
          variant: "destructive",
          title: "Profile update failed",
          description: "Please try again",
        })
      } else {
        setIsLoading(false)
        setIsFormChanged(false)
        toast({
          title: "Successful!",
          description: "Profile updated successfully",
        })
      }

      const result = await updateResponse.json()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: "Please try again",
      })
    }
  }

  async function changePicture(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault()
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = async (event) => {
      setIsImageLoading(true)
      const file = (event.target as HTMLInputElement)?.files?.[0]
      if (file) {
        setIsFormChanged(true)

        const sign = await fetch("/api/cloudinary/cdn-sign?type=avatar")
        const data = await sign.json()
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${data.cloudname}/auto/upload`

        const formData = new FormData()
        formData.append("file", file)
        formData.append("api_key", data.apikey)
        formData.append("timestamp", data.timestamp.toString())
        formData.append("signature", data.signature)
        formData.append("eager", data.eager)
        formData.append("folder", data.folder)

        const cdnResponse = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
          cache: "no-store",
        })

        const resultImage = await cdnResponse.json()
        if (resultImage.secure_url) {
          setImage(resultImage.secure_url)
        }

        const response = await fetch("/api/user/updateProfilePic", {
          method: "PUT",
          body: JSON.stringify({
            image: resultImage.secure_url,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setIsImageLoading(false)
          toast({
            title: "Successful!",
            description: "Profile picture updated successfully",
          })
          window.location.reload()
        } else {
          toast({
            variant: "destructive",
            title: "Profile picture update failed",
            description: "Please try again",
          })
        }
      }
    }
    input.click()
  }

  const imageLoader = ({
    src,
    width,
    quality,
  }: {
    src: string
    width: number
    quality?: number
  }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  const handleUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setUsername(value)
    const isUsernameValid = /^[a-zA-Z0-9]{4,}$/.test(value)
    setIsUsernameValid(isUsernameValid)
    setIsFormValid(true)
    setIsFormChanged(true)
  }

  const handleNameChange = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setName(value)
    setIsFormValid(true)
    setIsFormChanged(true)
  }

  const handleContactChange = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setPhone(value)
    setIsFormValid(true)
    setIsFormChanged(true)
  }

  return (
    <div className="w-full px-8 sm:max-w-xl sm:rounded-lg mx-auto">
      <h2 className="text-2xl font-bold sm:text-xl text-center">
        Profile Settings
      </h2>
      <div className="border  rounded-xl px-1.5 py-1 flex space-x-2 mt-1 items-center mx-auto text-sm w-fit">
        <p className="text-center">Account type:</p>
        <p className="w-fit rounded-lg bg-orange-300 px-1 py-0.25 text-center">
          {currentUser?.type}
        </p>
      </div>
      <form className="space-y-5" onSubmit={submitHandler}>
        <div className="grid max-w-2xl mx-auto mt-6">
          <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0 mx-auto">
            <Image
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-primary"
              // loader={imageLoader}
              src={image}
              width={160}
              height={160}
              alt="Bordered avatar"
            />
            <div className="flex flex-col space-y-5 sm:ml-8">
              <Button
                type="button"
                className="w-28"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => changePicture(event)}
              >
                {isImageLoading ? (
                  <LoadingDots color="#FAFAFA" />
                ) : (
                  "Edit Picture"
                )}
              </Button>
            </div>
          </div>

          <div className="items-center mt-8">
            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <div className="mb-2 sm:mb-6">
                  <Label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium "
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="your.email@mail.com"
                    defaultValue={currentUser?.email || ""}
                    required
                    disabled
                  />
                </div>
                <Label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  defaultValue={currentUser?.name || ""}
                  onChange={handleNameChange}
                />
              </div>
            </div>

            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <Label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium"
                >
                  Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Your username"
                  defaultValue={currentUser?.username || ""}
                  onChange={handleUsernameChange}
                  pattern="[a-zA-Z0-9]{4,}"
                  maxLength={20}
                  required
                />
                {!isUsernameValid && (
                  <p className="text-sm text-red-500 mt-2">
                    Please provide a minimum of 4 characters without any special
                    characters
                  </p>
                )}
              </div>
            </div>

            <div className="mb-2 sm:mb-6">
              <Label htmlFor="phone" className="block mb-2 text-sm font-medium">
                Contact
              </Label>
              <Input
                type="text"
                id="phone"
                placeholder="Your contact number"
                defaultValue={currentUser?.phone || ""}
                onChange={handleContactChange}
              />
            </div>

            <Button
              type="submit"
              className={`w-full transition-opacity duration-500 ${
                isFormValid && isFormChanged ? "opacity-100" : "opacity-50"
              }`}
              disabled={!isFormValid || !isFormChanged}
            >
              {isLoading ? (
                <>
                  <LoadingDots color="#FAFAFA" />
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Settings
