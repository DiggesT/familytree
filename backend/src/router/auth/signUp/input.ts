import { z } from 'zod'

export const zSignUpTrpcInput = z.object({
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes.'),
  email: z.string().min(1).email('Invalid email.'),
  password: z.string().min(1, 'Password is required.').max(8, 'Password should be 1-8 characters.'),
})
