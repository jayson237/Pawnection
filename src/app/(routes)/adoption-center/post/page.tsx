"use client"

import Image from "next/image"
import React from "react"
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form"

import HeaderTitle from "../../../../components/HeaderTitle"
import { Button } from "../../../../components/ui/Button"
import { Input } from "../../../../components/ui/Input"
import { Label } from "../../../../components/ui/Label"
import { Toggle } from "../../../../components/ui/toggle"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group"

function PostAdoptionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
    setValue,
    getValues,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      type: "ucok",
      breed: "",
      age: "",
      gender: "",
      description: "",
      // imageUrl: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto md:px-0 px-4">
      <div className="py-[60px]">
        <div className="grid grid-cols-2">
          <Image
            src="/static/images/dog_left.png"
            alt="hura"
            width={604}
            height={400}
          />

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
              <div className="space-y-1">
                <Label htmlFor="type">Pet Type</Label>
                <div className="flex flex-1 gap-2 w-full">
                  <ToggleGroup
                    onValueChange={(value) => {
                      setValue("type", value)
                    }}
                    value={watch("type")}
                    type="single"
                    variant="outline"
                    id="type"
                    defaultValue="ucok"
                  >
                    <ToggleGroupItem value="ucok" aria-label="Toggle ucok">
                      <p>Ucok</p>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="udin" aria-label="Toggle udin">
                      <p>Udin</p>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="bambang"
                      aria-label="Toggle bambang"
                    >
                      <p>Bambang</p>
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <Input
                    id="gender"
                    type="text"
                    disabled={isLoading}
                    {...register("gender", { required: true })}
                    errors={errors}
                    placeholder="Enter pet's gender"
                  />
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
                  Object.values(errors).filter((e) => e !== undefined).length >
                    0
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

export default PostAdoptionPage
