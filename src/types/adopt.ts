import { z } from "zod"

export const CreateAdoptRequestSchema = z.object({
  message: z.string(),
  request_status: z.string(),
  full_name: z.string().min(2, {
    message: "Full name must be at least 2 characters long",
  }),
  age: z.coerce
    .number({
      required_error: "Calories is required",
    })
    .int()
    .positive()
    .min(0, { message: "Age should be positive" }),
  phone_number: z.string().min(8, {
    message: "Phone number must be at least 8 characters long",
  }),
  address: z.string({
    required_error: "Residential address is required",
  }),
  type_desired: z.string(),
  breed_desired: z.string(),
  work_details: z.string(),
  lifestyle_details: z.string({
    required_error: "Lifestyle detail is required",
  }),
  pet_experience: z.string({
    required_error: "Pet experience is required",
  }),
})
export type CreateAdoptRequestPayloadType = z.infer<
  typeof CreateAdoptRequestSchema
>
