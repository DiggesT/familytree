import { zStringOptional } from '@familytree/shared/src/zod'
import { z } from 'zod'

export const zGetMembersTrpcInput = z.object({
  treeId: z.string(),
  cursor: z.coerce.number().optional(),
  limit: z.number().min(1).max(100).default(10),
  search: zStringOptional,
})
