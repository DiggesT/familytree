import { trpc } from '../../lib/trpc'
import { zUpdateMemberTrpcInput } from './input'

export const updateMemberTrpcRoute = trpc.procedure.input(zUpdateMemberTrpcInput).mutation(async ({ ctx, input }) => {
  const { memberId, ...memberInput } = input

  if (!ctx.me) {
    throw new Error('Unauthorized (updateMemberTrpcRoute).')
  }

  const member = await ctx.prisma.member.findUnique({
    where: {
      id: memberId,
    },
  })

  if (!member) {
    throw new Error('Member not found (updateMemberTrpcRoute).')
  }

  if (ctx.me.id !== member.createdBy) {
    throw new Error('This is not your member (updateMemberTrpcRoute).')
  }

  await ctx.prisma.member.update({
    where: {
      id: memberId,
    },
    data: {
      ...memberInput,
    },
  })

  return true
})
