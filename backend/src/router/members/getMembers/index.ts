import { trpc } from '../../../lib/trpc'

export const getMembersTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const members = await ctx.prisma.member.findMany({
    select: {
      id: true,
      lastName: true,
      firstName: true,
      middleName: true,
    },
  })

  return members
})
