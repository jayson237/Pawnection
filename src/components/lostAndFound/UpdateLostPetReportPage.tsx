"use client"

import { useToast } from "@/hooks/useToast"
import { LostPetReport } from "@prisma/client"
import Image from "next/legacy/image"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

import LoadingDots from "../LoadingDots"
import { Button } from "../ui/Button"
import { DatePicker } from "../ui/DatePicker"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import { Textarea } from "../ui/TextArea"

interface LostPetReportDialogProps {
  lostPetReport: LostPetReport | null
}

const UpdateLostPetReportPage = ({
  lostPetReport,
}: LostPetReportDialogProps) => {
  const [image, setImage] = useState(
    lostPetReport?.imageUrl ||
      `${
        lostPetReport?.imageUrl?.split("/image/upload/")[0]
      }/image/upload/c_fill,h_160,w_160/${
        lostPetReport?.imageUrl?.split("/image/upload/")[1]
      }` ||
      "/icon.png",
  )
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [isFormChanged, setIsFormChanged] = useState(false)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [petName, setPetName] = useState(lostPetReport?.petName || "")
  const [animalType, setAnimalType] = useState(lostPetReport?.animalType || "")
  const router = useRouter()
  const [animalBreed, setAnimalBreed] = useState(
    lostPetReport?.animalBreed || "",
  )
  const [contactDetails, setContactDetails] = useState(
    lostPetReport?.contactDetails || "",
  )
  const [lastSeenArea, setLastSeenArea] = useState(
    lostPetReport?.lastSeenArea || "",
  )
  const [lastSeenDate, setLastSeenDate] = useState<Date>(
    lostPetReport?.lastSeenDate
      ? new Date(lostPetReport.lastSeenDate)
      : new Date(),
  )
  const [reportDescription, setReportDescription] = useState(
    lostPetReport?.reportDescription || "",
  )
  const [reportMessage, setReportMessage] = useState(
    lostPetReport?.reportMessage || "",
  )
  const [isFormValid, setIsFormValid] = useState(false)

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

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    event.preventDefault()

    try {
      const updateResponse = await fetch(
        "/api/lostAndFound/updateLostPetReport",
        {
          method: "PUT",
          body: JSON.stringify({
            reportId: lostPetReport?.id,
            petName,
            animalType,
            animalBreed,
            contactDetails,
            lastSeenArea,
            lastSeenDate,
            reportDescription,
            reportMessage,
          }),
        },
      )

      if (!updateResponse.ok) {
        toast({
          variant: "destructive",
          title: "Report update failed",
          description: "Please try again",
        })
      } else {
        setIsLoading(false)
        setIsFormChanged(false)
        toast({
          title: "Successful!",
          description: "Report updated successfully",
        })
        router.push(`/lostAndFound/losses/${lostPetReport?.id}`)
      }
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

        const sign = await fetch("/api/cloudinary/cdn-sign?type=post")
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

        const response = await fetch(
          "/api/lostAndFound/updateLostPetReportPic",
          {
            method: "PUT",
            body: JSON.stringify({
              reportId: lostPetReport?.id,
              image: resultImage.secure_url,
            }),
          },
        )
        const msg = await response.json()
        if (response.ok) {
          setIsImageLoading(false)
          toast({
            title: "Successful!",
            description: "Report picture updated successfully",
          })
        } else {
          toast({
            variant: "destructive",
            title: "Report picture update failed",
            description: msg.message,
          })
        }
      }
    }
    input.click()
  }

  const handlePetNameChange = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setPetName(value)
    setIsFormValid(true)
    setIsFormChanged(true)
  }

  const handleAnimalTypeChange = (val: string) => {
    setAnimalType(val)
    setIsFormValid(true)
    setIsFormChanged(true)
  }

  const handleAnimalBreedChange = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setAnimalBreed(value)
    setIsFormValid(true)
    setIsFormChanged(true)
  }

  const handleContactChange = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setContactDetails(value)
    setIsFormValid(true)
    setIsFormChanged(true)
  }

  const handleLastSeenAreaChange = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setLastSeenArea(value)
    setIsFormValid(true)
    setIsFormChanged(true)
  }

  const handleLastSeenDateChange = (value: Date | undefined) => {
    if (value) {
      setLastSeenDate(value)
    } else {
      setLastSeenDate(new Date())
    }
    setIsFormValid(true)
    setIsFormChanged(true)
  }

  const handleReportDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = e.target.value
    setReportDescription(value)
    setIsFormValid(true)
    setIsFormChanged(true)
  }

  const handleReportMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = e.target.value
    setReportMessage(value)
    setIsFormValid(true)
    setIsFormChanged(true)
  }

  return (
    <div className="w-full px-8 sm:max-w-xl sm:rounded-lg mx-auto mt-12">
      <h2 className="text-2xl font-bold sm:text-xl text-center">
        Lost Pet Report
      </h2>
      <form className="space-y-5" onSubmit={submitHandler}>
        <div className="grid max-w-2xl mx-auto mt-6">
          <div className="flex flex-col items-center space-y-5 mx-auto">
            <Image
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-primary"
              loader={imageLoader}
              src={image}
              width={160}
              height={160}
              alt="Bordered avatar"
            />

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

          <div className="items-center mt-8">
            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <div className="mb-2 sm:mb-6">
                  <Label
                    htmlFor="petName"
                    className="block mb-2 text-sm font-medium "
                  >
                    Pet Name
                  </Label>
                  <Input
                    type="petName"
                    id="petName"
                    defaultValue={lostPetReport?.petName || ""}
                    required
                    onChange={handlePetNameChange}
                  />
                </div>
                <Label
                  htmlFor="animalType"
                  className="block mb-2 text-sm font-medium"
                >
                  Animal Type
                </Label>
                <Select
                  onValueChange={(val) => {
                    handleAnimalTypeChange(val)
                  }}
                  defaultValue={lostPetReport?.animalType}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Animal Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Bird">Bird</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <Label
                  htmlFor="animalBreed"
                  className="block mb-2 text-sm font-medium"
                >
                  Animal Breed
                </Label>
                <Input
                  type="animalBreed"
                  id="animalBreed"
                  defaultValue={lostPetReport?.animalBreed || ""}
                  onChange={handleAnimalBreedChange}
                  maxLength={20}
                  required
                />
              </div>
            </div>

            <div className="mb-2 sm:mb-6">
              <Label
                htmlFor="contactDetails"
                className="block mb-2 text-sm font-medium"
              >
                Contact Details
              </Label>
              <Input
                type="contactDetails"
                id="contactDetails"
                defaultValue={lostPetReport?.contactDetails || ""}
                onChange={handleContactChange}
                required
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <Label
                htmlFor="foundArea"
                className="block mb-2 text-sm font-medium"
              >
                Found Area
              </Label>
              <Input
                type="foundArea"
                id="foundArea"
                defaultValue={lostPetReport?.lastSeenArea || ""}
                onChange={handleLastSeenAreaChange}
                required
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <Label
                htmlFor="foundDate"
                className="block mb-2 text-sm font-medium"
              >
                Found Date
              </Label>
              <DatePicker
                date={lastSeenDate}
                setDate={setLastSeenDate}
                handleDate={handleLastSeenDateChange}
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <Label
                htmlFor="reportDescription"
                className="block mb-2 text-sm font-medium"
              >
                Report Description
              </Label>
              <Textarea
                id="reportDescription"
                defaultValue={lostPetReport?.reportDescription || ""}
                required
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleReportDescriptionChange(e)
                }
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <Label
                htmlFor="reportMessage"
                className="block mb-2 text-sm font-medium"
              >
                Report Message
              </Label>
              <Textarea
                id="reportMessage"
                defaultValue={lostPetReport?.reportMessage || ""}
                required
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleReportMessageChange(e)
                }
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
export default UpdateLostPetReportPage
