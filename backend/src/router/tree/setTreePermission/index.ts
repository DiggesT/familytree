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
    }

    if (input.permission === 'INVITED') {
      const invited = ctx.prisma.userTreePermissions.findUnique({
        where: {
          userId_treeId: {
            userId: input.userId,
            treeId: input.treeId,
          },
          permissions: { has: input.permission },
        },
      })
      if (invited !== null) {
        throw new ExpectedError(`User has already been invited.`)
      }
    }

    await ctx.prisma.userTreePermissions.create({
      data: { userId: input.userId, treeId: input.treeId, permissions: [input.permission] },
    })
    return true
  })
