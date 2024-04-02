"use client"

import { toast } from "@/hooks/useToast"
import { SafeUser } from "@/types"
import { CreateAdoptRequestPayloadType } from "@/types/adopt"
import { AdoptablePet } from "@prisma/client"
import { useRouter } from "next/navigation"
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
import { Textarea } from "../ui/TextArea"

function AdoptPetForm({
  currentUser,
  adoptablePet,
}: {
  currentUser: SafeUser
  adoptablePet: AdoptablePet
}) {
  const router = useRouter()
  const form = useForm<CreateAdoptRequestPayloadType>({
    defaultValues: {
      message: "",
      request_status: "",
      full_name: currentUser.name ?? "",
      age: 0,
      phone_number: "",
      address: "",
      type_desired: "",
      breed_desired: "",
      work_details: "",
      lifestyle_details: "",
      pet_experience: "",
    },
  })

  const onSubmit: SubmitHandler<CreateAdoptRequestPayloadType> = async (
    formData,
  ) => {
    const set = await fetch("/api/adopt/" + adoptablePet.id, {
      method: "POST",
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
        title: "Failed to sent adopt request",
        description: msg.message,
      })
    } else {
      toast({
        title: "Adopt request sent!",
        description: "Adoption center will contact you soon!",
      })
      router.push("/adopt/requests")
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6 pt-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your full name" />
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
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Enter your age" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Information</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your phone number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Residential Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pet_experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Experiences</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Pet experiences" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lifestyle_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lifestyle Details</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe your lifestyle details"
                />
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
          Send Request
        </Button>
      </form>
    </Form>
  )
}

export default AdoptPetForm
