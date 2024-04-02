"use client"

import { toast } from "@/hooks/useToast"
import { CreateAdoptablePetPayloadType } from "@/types/adoption-center"
import { Paperclip } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useCallback, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import { type SubmitHandler, useForm } from "react-hook-form"

import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"
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

function AdoptionPost() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<File>()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
    setValue,
    getValues,
    watch,
  } = useForm<CreateAdoptablePetPayloadType>({
    defaultValues: {
      name: "",
      type: "",
      breed: "",
      age: parseInt("0"),
      gender: "",
      description: "",
    },
  })

  const onSubmit: SubmitHandler<CreateAdoptablePetPayloadType> = async (
    data,
  ) => {
    const set = await fetch("/api/adoption-center", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        age: parseInt(data.age.toString()),
      }),
      cache: "no-store",
    })
    const msg = await set.json()
    if (!set.ok) {
      toast({
        variant: "destructive",
        title: "Failed to create post",
        description: msg.message,
      })
    } else {
      toast({
        title: "Post created successfully",
        description: "Successfully posted! Please wait...",
      })
      router.push("/adoption-center")
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        setSelectedImage(acceptedFiles[0])
        handleUpload(acceptedFiles[0])
      }
      rejectedFiles.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            toast({
              variant: "destructive",
              title: "File too large",
              description: "Please upload a file smaller than 5 MB",
            })
          }
        })
      })
    },
    [],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 5242880,
    multiple: false,
  })

  const handleUpload = async (selectedImage: File | null) => {
    const sign = await fetch("/api/cloudinary/cdn-sign?type=adoptable")
    const data = await sign.json()
    const url = `https://api.cloudinary.com/v1_1/${data.cloudname}/auto/upload`
    try {
      const formData = new FormData()
      if (selectedImage) {
        formData.append("file", selectedImage)
        formData.append("api_key", data.apikey)
        formData.append("timestamp", data.timestamp.toString())
        formData.append("signature", data.signature)
        formData.append("eager", data.eager)
        formData.append("folder", data.folder)

        const upload = await fetch(url, {
          method: "POST",
          body: formData,
          cache: "no-cache",
        })
        const result = await upload.json()
        if (upload.ok) {
          setValue("imageUrl", result.secure_url)
          toast({
            title: "Successfully uploaded image",
          })
        } else {
          toast({
            variant: "destructive",
            title: "Failed to upload image",
            description: "Please try again",
          })
        }
      } else {
        toast({
          variant: "destructive",
          title: "No picture uploaded",
          description: "Please try again",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to upload image",
        description: "Please try again",
      })
    }
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px]">
        <div className="grid grid-cols-2">
          <div className="place-content-end py-3">
            {selectedImage ? (
              <Image
                src={`${URL.createObjectURL(selectedImage)}`}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-auto mx-auto mb-4"
              />
            ) : (
              <Image
                src="/static/images/dog_left.webp"
                alt="hura"
                width={604}
                height={400}
              />
            )}

            <div
              className="cursor-pointer text-sm border rounded-lg border-dashed border-gray-600"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="my-4 flex cursor-pointer flex-row items-center justify-center">
                  <Paperclip className="mr-1 mt-[1px] h-3 w-3" />
                  <p className="font-semiboldtext-decoration: text-sm underline underline-offset-2">
                    Drop image here
                  </p>
                </div>
              ) : (
                <div className="my-4 flex cursor-pointer flex-row items-center justify-center">
                  <Paperclip className="mr-1 mt-[1px] h-3 w-3" />
                  <p className="text-decoration: text-xsm font-semibold underline underline-offset-2">
                    Upload by clicking or dropping an image
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="py-3 rounded-lg px-6 w-full">
            <HeaderTitle className="max-w-full">
              Pet Information Form
            </HeaderTitle>

            <form className="space-y-6 pt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-1">
                <Label htmlFor="name">Pet Name</Label>
                <Input
                  id="name"
                  type="text"
                  disabled={isLoading}
                  {...register("name", { required: true })}
                  errors={errors}
                  placeholder="Enter pet's name"
                />
              </div>
              <div className="flex gap-6">
                <div className="space-y-1">
                  <Label htmlFor="type">Pet Type</Label>
                  <Select
                    onValueChange={(val) => {
                      setValue("type", val)
                    }}
                    defaultValue={watch("type")}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Pet Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bird">Bird</SelectItem>
                      <SelectItem value="cat">Cat</SelectItem>
                      <SelectItem value="dog">Dog</SelectItem>
                      <SelectItem value="fish">Fish</SelectItem>
                      <SelectItem value="hamster">Hamster</SelectItem>
                      <SelectItem value="lizard">Lizard</SelectItem>
                      <SelectItem value="rabbit">Rabbit</SelectItem>
                      <SelectItem value="turtle">Turtle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="gender">Pet Gender</Label>
                  <RadioGroup
                    onValueChange={(val) => {
                      setValue("gender", val)
                    }}
                    defaultValue={watch("gender")}
                  >
                    <div className="flex items-center space-x-2 mt-1">
                      <RadioGroupItem value="Male" id="option-one" />
                      <Label htmlFor="option-one" className="pr-2">
                        Male
                      </Label>
                      <RadioGroupItem value="Female" id="option-two" />
                      <Label htmlFor="option-two">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  disabled={isLoading}
                  {...register("age", { required: true })}
                  errors={errors}
                  placeholder="Enter pet's age"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="breed">Breed</Label>
                <Input
                  id="breed"
                  type="text"
                  disabled={isLoading}
                  {...register("breed", { required: true })}
                  errors={errors}
                  placeholder="Enter pet's breed"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  disabled={isLoading}
                  {...register("description", { required: true })}
                  errors={errors}
                  placeholder="Enter a brief description about the pet"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  isLoading ||
                  !isValid ||
                  watch("imageUrl") === "" ||
                  Object.values(errors).filter((e) => e !== undefined).length >
                    0 ||
                  watch("imageUrl") === ""
                }
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdoptionPost