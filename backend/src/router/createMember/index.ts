import { trpc } from '../../lib/trpc'
import { zCreateMemberTrpcInput } from './input'

export const createMemberTrpcRoute = trpc.procedure.input(zCreateMemberTrpcInput).mutation(async ({ ctx, input }) => {
  await ctx.prisma.member.create({ data: { ...input, mother: '', father: '' } })
  return true
})
