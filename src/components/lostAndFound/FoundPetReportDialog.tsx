"use client"
import Image from 'next/image';
import { useEffect } from "react"; //image preview
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
import { DatePicker } from "../ui/DatePicker"

interface FoundPetReportDialogProps {
  isOpen: boolean
  onClose: () => void
}

const FoundPetReportDialog = ({
  isOpen,
  onClose,
}: FoundPetReportDialogProps) => {
  //pet image preview
  const [petImagePreview, setPetImagePreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setPetImage(file); // You are correctly setting the selected file here
    if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPetImagePreview(previewUrl); // And correctly setting the preview URL here
    } else {
        setPetImagePreview(null); // Clearing the preview if no file is selected
    }
};
  
  useEffect(() => {
    // Clean up the URL object to avoid memory leaks
    return () => {
      if (petImagePreview) {
        URL.revokeObjectURL(petImagePreview);
      }
    };
  }, [petImagePreview]);//end pet image preview
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
  const [errors, setErrors] = useState({
    animalType: "",
    name: "",
    breed: "",
    sex: "",
    message: "",
    description: "",
    foundArea: "",
    foundDate: "",
    contactDetails: "",
    petImage: ""
  });

  const validateForm = () => {
    const newErrors = {
      animalType: !animalType ? "Animal type is required" : "",
      name: !name ? "Name is required" : "",
      breed: !breed ? "Breed is required" : "",
      sex: !sex ? "Gender is required" : "",
      message: !message ? "Message is required" : "",
      description: !description ? "Description is required" : "",
      foundArea: !foundArea ? "Area found is required" : "",
      foundDate: !foundDate ? "Date found is required" : "",
      contactDetails: !contactDetails ? "Contact details are required" : "",
      petImage: !petImage ? "Pet image is required" : ""
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
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
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => (isOpen ? null : onClose())}>
    <DialogPortal>
      <DialogOverlay className="DialogOverlay" />
      <DialogContent className="DialogContent overflow-y-auto max-h-[80vh]">
        <DialogTitle className="DialogTitle">Report Found Pet</DialogTitle>
        <form onSubmit={onSubmit} className="flex gap-10">
          {/* Adjusted Left column for image upload to be top aligned */}
                  <div className="w-1/3 flex flex-col items-center justify-start">
          <Label htmlFor="petImage" className="mb-2">Pet Image</Label>
          <div className="w-48 h-48 border border-black rounded-md overflow-hidden flex items-center justify-center relative">
            <div className="absolute inset-0">
              {petImagePreview && (
                <Image src={petImagePreview} alt="Uploaded Pet" layout="fill" objectFit="cover" /> // This is new
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
              onChange={handleImageChange} // Ensure this is linked to your handleImageChange function
            />
          </div>
        </div>
        {/* Right column for other inputs */}
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
                    className="border border-black rounded-md h-10 w-full px-2.5"
                    required={true}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </Label>
              </div>
  
              <Label className="">
                Pet Breed
                <Input
                  className="border border-black rounded-md h-10 w-full px-2.5"
                  required={true}
                  onChange={(e) => setBreed(e.currentTarget.value)}
                />
              </Label>
  
              <div className="">
                <Label>Gender</Label>
                <RadioGroup onValueChange={setSex} required={true} className="flex gap-2">
                  <Label htmlFor="male" className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="Male" id="male" className="cursor-pointer" />
                    Male
                  </Label>
                  <Label htmlFor="female" className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="Female" id="female" className="cursor-pointer" />
                    Female
                  </Label>
                  <Label htmlFor="unsure" className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="Unsure" id="unsure" className="cursor-pointer" />
                    Unsure
                  </Label>
                </RadioGroup>
              </div>
  
              <Label className="">
                Message From Owner
                <Textarea
                  required={true}
                  onChange={(e) => setMessage(e.currentTarget.value)}
                />
              </Label>
  
              <Label className="">
                Description
                <Textarea
                  required={true}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                />
              </Label>
  
              <Label className="w-full ">
                Area Found
                <Input
                  className="border border-black rounded-md h-10 w-full px-2.5"
                  onChange={(e) => setFoundArea(e.currentTarget.value)}
                />
              </Label>
  
            <div className=" ">
              <div> Found Date </div>
              {/* <Calendar
                mode="single"
                selected={foundDate}
                onSelect={setFoundDate}
                className="rounded-md border shadow flex justify-center"
                disabled={(date) => date > new Date() || date < new Date("1900-01-01") }
              /> */}
              <DatePicker date={foundDate} setDate={setFoundDate} />
            </div>
  
              <Label className="w-full ">
                Contact Details
                <Input
                  className="border border-black rounded-md h-10 w-full px-2.5"
                  required={true}
                  onChange={(e) => setContactDetails(e.currentTarget.value)}
                />
              </Label>
              <div className="flex justify-center w-full">
                <Button type="submit">
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );  
}

export default FoundPetReportDialog;