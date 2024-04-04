"use client"

import { useToast } from "@/hooks/useToast"
import { FormEvent, useState } from "react"

import { Button } from "../ui/Button"
import { Calendar } from "../ui/Calendar"
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
}

const FoundPetReportDialog = ({
  isOpen,
  onClose,
}: FoundPetReportDialogProps) => {
  const [animalType, setAnimalType] = useState("")
  const [name, setName] = useState("")
  const [breed, setBreed] = useState("")
  const [sex, setSex] = useState("")
  const [message, setMessage] = useState("")
  const [description, setDescription] = useState("")
  const [foundArea, setFoundArea] = useState("")
  const [foundDate, setFoundDate] = useState<Date | undefined>()
  const [contactDetails, setContactDetails] = useState("")
  const [petImage, setPetImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

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

        const response = await fetch("/api/lostAndFound/createFoundPetReport", {
          method: "POST",
          body: JSON.stringify({
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
        <DialogContent className="DialogContent overflow-y-auto">
          <DialogTitle className="DialogTitle max-w-full">
            Report Found Pet
          </DialogTitle>

          <form onSubmit={onSubmit}>
            <div className="flex gap-4">
              <div className="mb-5">
                <Label>Pet Type</Label>

                <Select
                  onValueChange={(val) => {
                    setAnimalType(val)
                  }}
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

              <div className="w-[180px] mb-5">
                <Label>
                  Pet Breed
                  <Input
                    name="Pet Breed"
                    className="border border-black rounded-md h-10 w-full px-2.5"
                    onChange={(e) => setBreed(e.currentTarget.value)}
                  ></Input>
                </Label>
              </div>

              <div className="w-[180px] mb-5">
                <Label>Pet Name</Label>
                <Input
                  name="Pet Name"
                  className="border border-black rounded-md h-10 w-full px-2.5"
                  onChange={(e) => setName(e.currentTarget.value)}
                ></Input>
              </div>
            </div>

            <div className="mb-5">
              <div>
                <Label> Gender </Label>
                <RadioGroup defaultValue="comfortable" onValueChange={setSex}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="r1" />
                    <Label htmlFor="r1">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="r2" />
                    <Label htmlFor="r2">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Unsure" id="r3" />
                    <Label htmlFor="r3">Unsure</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className=" mb-5">
              <div> Message From Founder </div>
              <Textarea
                name="reportMessage"
                required={true}
                onChange={(e) => setMessage(e.currentTarget.value)}
              />
            </div>

            <div className=" mb-5">
              <div> Description </div>
              <Textarea
                name="reportDescription"
                required={true}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </div>

            <div className="w-[180px] mb-5">
              <Label>
                Area Found
                <Input
                  name="Area Found"
                  className="border border-black rounded-md h-10 w-full px-2.5"
                  onChange={(e) => setFoundArea(e.currentTarget.value)}
                ></Input>
              </Label>
            </div>

            <div className=" mb-5">
              <div> Found Date </div>
              <Calendar
                mode="single"
                selected={foundDate}
                onSelect={setFoundDate}
                className="rounded-md border shadow flex justify-center"
              />
            </div>

            <div className="w-[180px] mb-5">
              <Label>
                Contact Details
                <Input
                  name="Contact Details"
                  className="border border-black rounded-md h-10 w-full px-2.5"
                  onChange={(e) => setContactDetails(e.currentTarget.value)}
                ></Input>
              </Label>
            </div>

            <Input
              type="file"
              accept="image/*"
              required={true}
              onChange={(e) =>
                setPetImage(e.target.files ? e.target.files[0] : null)
              }
            />

            <div className="flex justify-center">
              <Button className="w-1/6 mt-10 justify-center" type="submit">
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default FoundPetReportDialog
