import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zGetUsersTrpcInput } from './input'

export const getUsersTrpcRoute = trpcLoggedProcedure.input(zGetUsersTrpcInput).query(async ({ ctx, input }) => {
  const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, '&') : undefined
  const users = await ctx.prisma.user.findMany({
    select: {
      id: true,
      nick: true,
    },
    where: {
      nick: {
        search: normalizedSearch,
      },
    },
  })

  return users
})
