import { z } from 'zod'

export const zCreateMemberTrpcInput = z.object({
  lastName: z.string().min(1, 'Last Name is required'),
  firstName: z.string().min(1, 'First Name is required'),
  middleName: z.string(),
  text: z.string(),
})
