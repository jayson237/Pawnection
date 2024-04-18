"use client"

import { toast } from "@/hooks/useToast"
import { EditAdoptablePetPayloadType } from "@/types/adoptionCenter"
import {
  AdoptablePet,
  AdoptablePetStatus,
  AdoptionRequest,
} from "@prisma/client"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "../ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form"
import { Input } from "../ui/Input"
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import { Textarea } from "../ui/TextArea"

function AdoptionCenterManagerForm({
  data,
}: {
  data: AdoptablePet & { adoptionRequests: AdoptionRequest[] }
}) {
  const form = useForm<EditAdoptablePetPayloadType>({
    defaultValues: {
      name: data?.name,
      type: data?.type,
      breed: data?.breed,
      age: data?.age,
      gender: data?.gender,
      description: data?.description,
      imageUrl: data?.imageUrl,
      status: data.status,
    },
  })

  const onSubmit: SubmitHandler<EditAdoptablePetPayloadType> = async (
    formData,
  ) => {
    const set = await fetch("/api/adoptionCenter/" + data.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        age: parseInt(formData.age.toString()),
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
      window.location.reload()
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6 pt-6 " onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter pet's name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Pet Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="bird">Bird</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Pet Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={AdoptablePetStatus.Adopted}>
                    {AdoptablePetStatus.Adopted}
                  </SelectItem>
                  <SelectItem value={AdoptablePetStatus.Adopting}>
                    {AdoptablePetStatus.Available}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Pet Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center space-x-2 mt-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Age</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Enter pet's age" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Breed</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter pet's breed" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter a brief description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isLoading || !form.formState.isDirty}
        >
          Save
        </Button>
      </form>
    </Form>
  )
}

export default AdoptionCenterManagerForm
