import { z } from 'zod'

export const zCreateMemberTrpcInput = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  role: z.string().min(1, 'Role is required'),
  text: z.string(),
})
