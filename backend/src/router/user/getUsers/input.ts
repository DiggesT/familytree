import { zStringOptional } from '@familytree/shared/src/zod'
import { z } from 'zod'

export const zGetUsersTrpcInput = z.object({
  search: zStringOptional,
})
