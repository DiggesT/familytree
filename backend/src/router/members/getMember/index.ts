import { z } from 'zod'
import { trpc } from '../../../lib/trpc'

export const getMemberTrpcRoute = trpc.procedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
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
