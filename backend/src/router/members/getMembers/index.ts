import { trpc } from '../../../lib/trpc'
import { zGetMembersTrpcInput } from './input'

export const getMembersTrpcRoute = trpc.procedure.input(zGetMembersTrpcInput).query(async ({ ctx, input }) => {
  const members = await ctx.prisma.member.findMany({
    select: {
      id: true,
      lastName: true,
      firstName: true,
      middleName: true,
      serialNumber: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        serialNumber: 'desc',
      },
    ],
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
    take: input.limit + 1,
  })

  const nextMember = members.at(input.limit)
  const nextCursor = nextMember?.serialNumber

  return { members: members.slice(0, input.limit), nextCursor }
})
