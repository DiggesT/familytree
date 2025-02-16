import { zStringRequired } from '@familytree/shared/src/zod'
import { z } from 'zod'

export const zSignInTrpcInput = z.object({
  nick: zStringRequired('Nick is required.'),
  password: zStringRequired('Password is required.'),
})
