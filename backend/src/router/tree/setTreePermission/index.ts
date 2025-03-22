import { ExpectedError } from '../../../lib/error'
import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zSetTreePermissionTrpcInput } from './input'

export const setTreePermissionTrpcRoute = trpcLoggedProcedure
  .input(zSetTreePermissionTrpcInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw Error('Unauthorized (zCreateTreeTrpcInput).')
    }

    const tree = await ctx.prisma.tree.findUnique({
      where: {
        id: input.treeId,
      },
    })
    if (!tree) {
      throw new ExpectedError(`Tree doesn't exist.`)
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: input.userId,
      },
    })
    if (!user) {
      throw new ExpectedError(`User doesn't exist.`)
    } else if (user.nick === ctx.me.nick) {
      throw new ExpectedError(`You cannot send invite to yourself.`)
    }

    if (input.permission === 'INVITED') {
      const invited = await ctx.prisma.userTreePermissions.findUnique({
        where: {
          userId_treeId: {
            userId: input.userId,
            treeId: input.treeId,
          },
        },
      })
      if (invited !== null) {
        throw new ExpectedError(`User has already been invited.`)
      }
    }

    await ctx.prisma.userTreePermissions.upsert({
      where: {
        userId_treeId: {
          userId: input.userId,
          treeId: input.treeId,
        },
      },
      update: {
        permissions: [input.permission],
      },
      create: { userId: input.userId, treeId: input.treeId, permissions: [input.permission] },
    })
    return true
  })
