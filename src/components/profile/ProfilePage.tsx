"use client"

import { User } from "@prisma/client"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import { Button } from "../ui/Button"

interface ProfilePageProps {
  currentUser: User
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
  const [name, setName] = useState(currentUser?.name || "")
  const [username, setUsername] = useState(currentUser?.username || "")
  const [email, setEmail] = useState(currentUser?.email || "")
  const [phone, setPhone] = useState(currentUser?.phone || "")
  const [address, setAddress] = useState(currentUser?.address || "")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState(currentUser?.image || "")

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
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
      const updateResponse = await fetch("/api/updateProfile", {
        method: "PUT",
        body: JSON.stringify({
          name,
          username,
          email,
          phone,
          address,
          image: resultImage.url,
        }),
      })

      if (!updateResponse.ok) {
        toast.error("Failed to update user.")
        throw new Error("Failed to update user. Please try again.")
      } else {
        toast.success("Profile updated successfully")
      }

      const result = await updateResponse.json()
    } catch (error) {}
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
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
          >
            Pubic Profile
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
          >
            My Media
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
          >
            My Lost Pets
          </a>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">
              Public Profile
            </h2>
            <form className="mt-8 space-y-5" onSubmit={submitHandler}>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={
                      currentUser.image ? currentUser.image : "../../icon.png"
                    }
                    alt="Bordered avatar"
                  />
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <Button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none
                    bg-[#202142] rounded-lg border
                    border-indigo-200
                    hover:bg-indigo-900 focus:z-10 focus:ring-4
                    focus:ring-indigo-200 "
                      onClick={changePicture}
                    >
                      Change picture
                    </Button>
                    <Button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium 
                      text-indigo-900 focus:outline-none 
                      bg-white rounded-lg border 
                      border-indigo-200 hover:bg-indigo-100 
                      hover:text-[#202142] focus:z-10 focus:ring-4
                      focus:ring-indigo-200 "
                      onClick={deletePicture}
                    >
                      Delete picture
                    </Button>
                  </div>
                </div>

                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your name"
                        defaultValue={currentUser?.name || ""}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your username"
                        defaultValue={currentUser?.username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="your.email@mail.com"
                      defaultValue={currentUser?.email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="your phone"
                      defaultValue={currentUser?.phone || ""}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your address
                    </label>
                    <input
                      id="address"
                      className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                      placeholder="your address"
                      defaultValue={currentUser?.address || ""}
                      onChange={(e) => setAddress(e.target.value)}
                    ></input>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Toaster position="top-center" />
    </div>
  )
}

export default ProfilePage
