import { z } from "zod"

export const CreateAdoptRequestSchema = z.object({
  message: z.string(),
  request_status: z.string(),
  full_name: z.string(),
  age: z.number(),
  phone_number: z.string(),
  address: z.string(),
  type_desired: z.string(),
  breed_desired: z.string(),
  work_details: z.string(),
  lifestyle_details: z.string(),
  pet_experience: z.string(),
})
export type CreateAdoptRequestPayloadType = z.infer<
  typeof CreateAdoptRequestSchema
>
