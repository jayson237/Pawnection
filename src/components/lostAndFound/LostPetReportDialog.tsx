"use client"

import { useToast } from "@/hooks/useToast"
import Image from "next/image"
import { FormEvent, useEffect, useState } from "react"

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

interface LostPetReportDialogProps {
  isOpen: boolean
  onClose: () => void
  onReportCreated: () => void;
}

const LostPetReportDialog = ({ isOpen, onClose, onReportCreated }: LostPetReportDialogProps) => {
  const [animalType, setAnimalType] = useState("")
  const [name, setName] = useState("")
  const [sex, setSex] = useState("")
  const [breed, setBreed] = useState("")
  const [message, setMessage] = useState("")
  const [description, setDescription] = useState("")
  const [lastSeenArea, setLastSeenArea] = useState("")
  const [lastSeenDate, setLastSeenDate] = useState(new Date())
  const [contactDetails, setContactDetails] = useState("")
  const [petImage, setPetImage] = useState<File | null>(null)
  const [petImagePreview, setPetImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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

        const response = await fetch("/api/lostAndFound/createLostPetReport", {
          method: "POST",
          body: JSON.stringify({
            isActive: true,
            animalType: animalType,
            name: name,
            breed: breed,
            sex: sex,
            message: message,
            description: description,
            lastSeenArea: lastSeenArea,
            lastSeenDate: lastSeenDate,
            contactDetails: contactDetails,
            petImage: resultImage.secure_url,
          }),
        })

        if (!response.ok) {
          throw new Error(
            "Failed to create Missing Pet Report. Please try again.",
          )
        } else {
          setIsLoading(false)
          toast({
            description: "Missing Pet Report has been successfully created.",
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
          <DialogTitle className="DialogTitle">Report Missing Pet</DialogTitle>
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
              <div className="flex gap-4 ">
                <Label className="flex-1">
                  Pet Type
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
                </Label>

                <Label className="flex-1">
                  Pet Name
                  <Input
                    className="border rounded-md h-10 w-full px-2.5"
                    required={true}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </Label>
              </div>

              <Label className="">
                Pet Breed
                <Input
                  className="border rounded-md h-10 w-full px-2.5"
                  required={true}
                  onChange={(e) => setBreed(e.currentTarget.value)}
                />
              </Label>
              <div className="">
                <Label>Gender</Label>
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

              <Label className="block">
                Pet Description
                <Textarea
                  className="mt-1"
                  required={true}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                />
              </Label>

              <Label className="block">
                Area Last Seen
                <Input
                  className="mt-1 border rounded-md h-10 w-full px-2.5"
                  required={true}
                  onChange={(e) => setLastSeenArea(e.currentTarget.value)}
                />
              </Label>

              <Label className="block">
                Last Seen Date
                <DatePicker date={lastSeenDate} setDate={setLastSeenDate} />
              </Label>

              <Label className="block">
                Contact Details
                <Input
                  className="mt-1 border rounded-md h-10 w-full px-2.5"
                  required={true}
                  onChange={(e) => setContactDetails(e.currentTarget.value)}
                />
              </Label>

              <Label className="block">
                Message From Owner
                <Textarea
                  className="mt-1"
                  required={true}
                  onChange={(e) => setMessage(e.currentTarget.value)}
                />
              </Label>

              <div className="flex justify-end w-full">
                <Button type="submit" className={isLoading ? "loading" : ""}>
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default LostPetReportDialog
