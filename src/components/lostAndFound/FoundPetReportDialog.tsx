"use client"

import { useToast } from "@/hooks/useToast"
import Image from "next/legacy/image"
import { useEffect } from "react"
import { FormEvent, useState } from "react"

import LoadingDots from "../LoadingDots"
import { Button } from "../ui/Button"
import { DatePicker } from "../ui/DatePicker"
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../ui/Dialog"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import { Textarea } from "../ui/TextArea"

interface FoundPetReportDialogProps {
  isOpen: boolean
  onClose: () => void
  onReportCreated: () => void
}

const FoundPetReportDialog = ({
  isOpen,
  onClose,
  onReportCreated,
}: FoundPetReportDialogProps) => {
  const [petImagePreview, setPetImagePreview] = useState<string | null>(null)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setPetImage(file)
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setPetImagePreview(previewUrl)
    } else {
      setPetImagePreview(null)
    }
  }

  useEffect(() => {
    return () => {
      if (petImagePreview) {
        URL.revokeObjectURL(petImagePreview)
      }
    }
  }, [petImagePreview])
  const [animalType, setAnimalType] = useState("")
  const [name, setName] = useState("")
  const [breed, setBreed] = useState("")
  const [sex, setSex] = useState("")
  const [message, setMessage] = useState("")
  const [description, setDescription] = useState("")
  const [foundArea, setFoundArea] = useState("")
  const [foundDate, setFoundDate] = useState(new Date())
  const [contactDetails, setContactDetails] = useState("")
  const [petImage, setPetImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [isFormComplete, setIsFormComplete] = useState(false)

  const checkFormCompletion = () => {
    return !!(
      animalType &&
      name &&
      breed &&
      sex &&
      description &&
      foundArea &&
      foundDate &&
      contactDetails &&
      message &&
      petImage
    )
  }

  useEffect(() => {
    setIsFormComplete(checkFormCompletion())
  }, [
    animalType,
    name,
    breed,
    sex,
    description,
    foundArea,
    foundDate,
    contactDetails,
    message,
    petImage,
  ])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const sign = await fetch("/api/cloudinary/cdn-sign?type=post")
    const data = await sign.json()
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${data.cloudname}/auto/upload`
    try {
      const formData = new FormData()
      if (petImage) {
        formData.append("file", petImage)
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

        const response = await fetch("/api/lostAndFound/createFoundPetReport", {
          method: "POST",
          body: JSON.stringify({
            isActive: true,
            animalType: animalType,
            name: name,
            breed: breed,
            sex: sex,
            message: message,
            description: description,
            foundArea: foundArea,
            foundDate: foundDate,
            contactDetails: contactDetails,
            petImage: resultImage.secure_url,
          }),
        })

        if (!response.ok) {
          throw new Error(
            "Failed to create Found Pet Report. Please try again.",
          )
        } else {
          setIsLoading(false)
          toast({
            description: "Found Pet Report has been successfully created.",
          })
          onReportCreated()
          onClose()
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!isOpen) return null

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => (isOpen ? null : onClose())}
    >
      <DialogPortal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="DialogContent overflow-y-auto max-h-[80vh]">
          <DialogTitle className="DialogTitle">Report Found Pet</DialogTitle>
          <form onSubmit={onSubmit} className="flex gap-10">
            <div className="w-1/3 flex flex-col items-center justify-start">
              <div className="w-48 h-48 border rounded-md overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0">
                  {petImagePreview && (
                    <Image
                      src={petImagePreview}
                      alt="Uploaded Pet"
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
                {!petImagePreview && (
                  <div className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none">
                    <p>Upload Image</p>
                    <p className="text-xs">(Click to select)</p>
                  </div>
                )}
                <Input
                  id="petImage"
                  type="file"
                  accept="image/*"
                  required={true}
                  className="opacity-0 w-full h-full position-absolute cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex flex-row gap-4 ">
                <div className="flex flex-col space-y-1">
                  <Label className="flex-1" aria-required="true">
                    Pet Type
                  </Label>
                  <Select required={true} onValueChange={setAnimalType}>
                    <SelectTrigger className="w-full">
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

                <div className="flex flex-col space-y-1">
                  <Label className="flex-1" aria-required="true">
                    Pet Name
                  </Label>
                  <Input
                    className="border rounded-md h-10 w-full px-2.5"
                    required={true}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <Label aria-required="true">Pet Breed</Label>
                <Input
                  className="border rounded-md h-10 w-full px-2.5"
                  required={true}
                  onChange={(e) => setBreed(e.currentTarget.value)}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Label aria-required="true">Gender</Label>
                <RadioGroup
                  onValueChange={setSex}
                  required={true}
                  className="flex gap-2"
                >
                  <Label
                    htmlFor="male"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value="Male"
                      id="male"
                      className="cursor-pointer"
                    />
                    Male
                  </Label>
                  <Label
                    htmlFor="female"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value="Female"
                      id="female"
                      className="cursor-pointer"
                    />
                    Female
                  </Label>
                  <Label
                    htmlFor="unsure"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value="Unsure"
                      id="unsure"
                      className="cursor-pointer"
                    />
                    Unsure
                  </Label>
                </RadioGroup>
              </div>

              <div>
                <Label className="block" aria-required="true">
                  Pet Description
                </Label>
                <Textarea
                  className="mt-1"
                  required={true}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label className="block" aria-required="true">
                  Area Found
                </Label>
                <Input
                  className="mt-1 border rounded-md h-10 w-full px-2.5"
                  required={true}
                  onChange={(e) => setFoundArea(e.currentTarget.value)}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label className="block" aria-required="true">
                  Found Date
                </Label>
                <DatePicker date={foundDate} setDate={setFoundDate} />
              </div>

              <div className="flex flex-col space-y-1">
                <Label className="block" aria-required="true">
                  Contact Details
                </Label>
                <Input
                  className="mt-1 border rounded-md h-10 w-full px-2.5"
                  required={true}
                  onChange={(e) => setContactDetails(e.currentTarget.value)}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label className="block" aria-required="true">
                  Message From Supawhero
                </Label>
                <Textarea
                  className="mt-1"
                  required={true}
                  onChange={(e) => setMessage(e.currentTarget.value)}
                />
              </div>

              <div className="flex justify-end w-full">
                <Button
                  type="submit"
                  className="w-20"
                  disabled={!isFormComplete || isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingDots color="#FAFAFA" />
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default FoundPetReportDialog
