import { z } from 'zod'

export const zCreateTreeTrpcInput = z.object({
  name: z.string().min(1, 'Name is required.'),
})
