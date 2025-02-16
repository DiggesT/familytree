import { trpc } from '../../../lib/trpc'
import { zGetMemberTrpcInput } from './input'

export const getMemberTrpcRoute = trpc.procedure.input(zGetMemberTrpcInput).query(async ({ ctx, input }) => {
  const member = await ctx.prisma.member.findUnique({
    where: {
      id: input.id,
    },
    include: {
      creator: {
        select: {
          id: true,
          nick: true,
          name: true,
        },
      },
    },
  })
  return { member }
})
