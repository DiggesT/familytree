import { zStringRequired } from '@familytree/shared/src/zod'
import { z } from 'zod'

export const zGetUserByNickTrpcInput = z.object({
  nick: zStringRequired('Nick is required.'),
})
