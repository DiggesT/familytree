import { z } from 'zod'
import { zCreateMemberTrpcInput } from '../createMember/input'

export const zUpdateMemberTrpcInput = zCreateMemberTrpcInput.extend({
  memberId: z.string().min(1),
})
