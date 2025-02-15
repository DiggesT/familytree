import { z } from 'zod'

export const zCreateMemberTrpcInput = z.object({
  treeId: z.string(),
  lastName: z.string().min(1, 'Last Name is required.'),
  firstName: z.string().min(1, 'First Name is required.'),
  middleName: z.string(),
  text: z.string(),
})
