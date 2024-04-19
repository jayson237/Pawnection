import { AdoptablePetStatus } from "@prisma/client"
import { z } from "zod"

export const CreateAdoptablePetPayloadSchema = z.object({
  id: z.string().optional(),
  age: z.number(),
  breed: z.string(),
  description: z.string(),
  gender: z.string(),
  imageUrl: z.string().url().min(14),
  name: z.string(),
  type: z.string(),
})
export type CreateAdoptablePetPayloadType = z.infer<
  typeof CreateAdoptablePetPayloadSchema
>

export const EditAdoptablePetPayloadSchema = z.object({
  id: z.string().optional(),
  age: z.number(),
  breed: z.string(),
  description: z.string(),
  gender: z.string(),
  imageUrl: z.string().url().min(14),
  name: z.string(),
  type: z.string(),
  status: z.nativeEnum(AdoptablePetStatus),
})
export type EditAdoptablePetPayloadType = z.infer<
  typeof EditAdoptablePetPayloadSchema
>
