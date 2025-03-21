import { ExpectedError } from '../../../lib/error'
import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zGetUserByNickTrpcInput } from './input'

export const getUserByNickTrpcRoute = trpcLoggedProcedure
  .input(zGetUserByNickTrpcInput)
  .query(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      select: {
        id: true,
        nick: true,
      },
      where: {
        nick: input.nick,
      },
    })

    if (!user) {
      throw new ExpectedError(`User with this nick: ${input.nick}, doesn't exist.`)
    }

    return user
  })
