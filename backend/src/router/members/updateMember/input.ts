import { zStringRequired } from '@familytree/shared/src/zod'
import { z } from 'zod'
import { zCreateMemberTrpcInput } from '../createMember/input'

export const zUpdateMemberTrpcInput = zCreateMemberTrpcInput
  .extend({
    memberId: zStringRequired(),
    mother: z.string(),
    father: z.string(),
  })
  .omit({ treeId: true })
