import { z } from 'zod'
import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zGetMembersTrpcInput } from './input'

export const getMembersTrpcRoute = trpcLoggedProcedure
  .input(zGetMembersTrpcInput.extend({ orderCreatedAt: z.enum(['asc', 'desc']).optional().default('asc') }))
  .query(async ({ ctx, input }) => {
    const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, '&') : undefined
    const members = await ctx.prisma.member.findMany({
      select: {
        id: true,
        mother: true,
        father: true,
        lastName: true,
        firstName: true,
        middleName: true,
        serialNumber: true,
      },
      where: !input.search
        ? { treeId: input.treeId } // TODO: recurring condition
        : {
            treeId: input.treeId, // TODO: recurring condition
            OR: [
              {
                firstName: {
                  search: normalizedSearch,
                },
              },
              {
                lastName: {
                  search: normalizedSearch,
                },
              },
              {
                middleName: {
                  search: normalizedSearch,
                },
              },
            ],
          },
      orderBy: [
        {
          createdAt: input.orderCreatedAt,
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
