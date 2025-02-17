import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zCreateMemberTrpcInput } from './input'

export const createMemberTrpcRoute = trpcLoggedProcedure
  .input(zCreateMemberTrpcInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw Error('Unauthorized (createMemberTrpcRoute).')
    }

    await ctx.prisma.member.create({ data: { ...input, mother: '', father: '', createdBy: ctx.me.id } })
    return true
  })
