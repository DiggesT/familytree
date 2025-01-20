import { members } from '../../lib/members'
import { trpc } from '../../lib/trpc'
import { zCreateMemberTrpcInput } from './input'

export const createMemberTrpcRoute = trpc.procedure.input(zCreateMemberTrpcInput).mutation(({ input }) => {
  members.unshift({ ...input, id: members.length.toString() })
  return true
})
