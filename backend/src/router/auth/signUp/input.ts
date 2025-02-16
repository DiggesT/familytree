import { zPasswordRequired, zEmailRequired, zNickRequired } from '@familytree/shared/src/zod'
import { z } from 'zod'

export const zSignUpTrpcInput = z.object({
  nick: zNickRequired,
  email: zEmailRequired,
  password: zPasswordRequired,
})
