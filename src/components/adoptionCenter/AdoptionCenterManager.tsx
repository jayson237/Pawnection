"use client"

import { AdoptablePet, AdoptionRequest } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

import { toast } from "@/hooks/useToast"
import { cn } from "@/lib/utils"
import { EditAdoptablePetPayloadType } from "@/types/adoption-center"
import HeaderTitle from "../HeaderTitle"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog"
import { Button, buttonVariants } from "../ui/Button"
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

export default function AdoptionCenterManager({
  data,
}: {
  data: AdoptablePet & { adoptionRequests: AdoptionRequest[] }
}) {
  const router = useRouter()

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
    const set = await fetch("/api/adoption-center/" + data.id, {
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
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Link
            className={cn(buttonVariants({ variant: "outline" }))}
            href="/adoption-center"
          >
            Back
          </Link>
          <HeaderTitle>Edit Pet Details</HeaderTitle>
        </div>

        <div>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete you
                  pet posting.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const set = await fetch("/api/adoption-center/" + data.id, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      cache: "no-store",
                    })
                    const msg = await set.json()
                    if (!set.ok) {
                      toast({
                        variant: "destructive",
                        title: "Failed to delete post",
                        description: msg.message,
                      })
                    } else {
                      toast({
                        title: "Post deleted successfully",
                        description: "Successfully deleted! Please wait...",
                      })
                      router.push("/adoption-center")
                    }
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="rounded-xl border border-gray-400 h-full col-span-1">
          <div>
            <Image
              src={data.imageUrl}
              alt={data.name}
              width={1000}
              height={1000}
              className="rounded-xl h-full bg-cover bg-center w-full object-cover max-h-[440px]"
            />
          </div>
          <div className="px-3.5 py-4">
            <Form {...form}>
              <form
                className="space-y-6 pt-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Pet Type" />
                          </SelectTrigger>
                        </FormControl>
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
                            <FormLabel className="font-normal">
                              Female
                            </FormLabel>
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
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter pet's age"
                        />
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
                        <Textarea
                          {...field}
                          placeholder="Enter a brief description"
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
                  Edit
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="h-full col-span-2">
          <HeaderTitle className="text-left">Your Pet Requests</HeaderTitle>

          <div className="mt-6">
            {data.adoptionRequests.length === 0 ? (
              <p className="">No requests yet</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {data.adoptionRequests.map((request) => (
                  <div
                    key={request.id}
                    className={cn(
                      "rounded-xl border border-gray-400 p-4",
                      "flex justify-between items-center",
                    )}
                  >
                    <div>
                      <p className="text-lg font-bold">{request.full_name}</p>
                      <p>{request.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
