"use client"

import { useToast } from "@/hooks/useToast"
import { SafeUser } from "@/types"
import Image from "next/image"
import { useState } from "react"

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
  const [name, setName] = useState(currentUser?.name || "")
  const [username, setUsername] = useState(currentUser?.username || "")
  const [phone, setPhone] = useState(currentUser?.phone || "")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState(currentUser?.image || "")

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    event.preventDefault()
    const sign = await fetch("/api/cloudinary/cdn-sign?type=post")
    const data = await sign.json()
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${data.cloudname}/auto/upload`

    try {
      const formData = new FormData()
      formData.append("file", image || "")
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
        setImageUrl(resultImage.secure_url)
      }
      const updateResponse = await fetch("/api/user/updateProfile", {
        method: "PUT",
        body: JSON.stringify({
          name,
          username,
          phone,
          image: resultImage.url,
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

  const changePicture = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0]
      const reader = new FileReader()
      if (file) {
        reader.onloadend = () => {
          setImagePreview(file)
        }
        setImage(file)
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const deletePicture = () => {
    setImagePreview(null)
    setImage(null)
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
              src={currentUser?.image ? currentUser.image : "/../../icon.png"}
              width={160}
              height={160}
              alt="Bordered avatar"
            />
            <div className="flex flex-col space-y-5 sm:ml-8">
              <Button type="button" onClick={changePicture}>
                Change picture
              </Button>
              <Button
                type="button"
                className="border"
                variant="ghost"
                onClick={deletePicture}
              >
                Delete picture
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
                  onChange={(e) => setName(e.target.value)}
                  required
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
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
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
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
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
