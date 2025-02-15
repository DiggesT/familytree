import { z } from 'zod'

export const zGetTreeTrpcInput = z.object({
  creator: z.string(),
})
