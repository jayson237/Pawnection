import { z } from "zod"

export const AdoptablePetPayloadSchema = z.object({
  age: z.number(),
  breed: z.string(),
  description: z.string(),
  gender: z.string(),
  imageUrl: z.string().url().min(14),
  name: z.string(),
  type: z.string(),
})
export type AdoptablePetPayloadType = z.infer<typeof AdoptablePetPayloadSchema>
