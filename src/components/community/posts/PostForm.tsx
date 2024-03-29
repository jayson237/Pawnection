"use client"

import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import LoadingDots from "@/components/ui/LoadingDots"
import { Textarea } from "@/components/ui/TextArea"
import { useToast } from "@/hooks/useToast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Paperclip, Plus } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useCallback } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import z from "zod"

const createPostSchema = z.object({
  description: z.string(),
  imageUrl: z.string(),
})

const PostForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isLoading, isValid },
  } = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      description: "",
      imageUrl: "",
    },
  })

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
    const sign = await fetch("/api/cloudinary/cdn-sign?type=post")
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

  const onSubmit = async (data: z.infer<typeof createPostSchema>) => {
    const set = await fetch("/api/community/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      router.push("/community")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>New post</DialogTitle>
            <DialogDescription>
              Upload your image (Max 5 MB), and consider adding a description to
              your post as well
            </DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <Image
              src={`${URL.createObjectURL(selectedImage)}`}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-auto mx-auto"
            />
          )}
          <div
            className="cursor-pointer text-sm border rounded-md"
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

          <Textarea {...register("description")} placeholder="Description" />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
          <DialogFooter>
            <Button type="submit" disabled={isLoading || !watch("imageUrl")}>
              {isLoading ? (
                <>
                  <LoadingDots color="#FAFAFA" />
                </>
              ) : (
                "Post"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PostForm
