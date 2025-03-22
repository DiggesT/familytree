import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zGetTreeByPermissionTrpcInput } from './input'

export const getTreeByPermissionTrpcRoute = trpcLoggedProcedure
  .input(zGetTreeByPermissionTrpcInput)
  .query(async ({ ctx, input }) => {
    const userTreePermissions = await ctx.prisma.userTreePermissions.findMany({
      where: {
        userId: input.userId,
        permissions: { hasSome: input.permissions },
      },
      include: {
        tree: {
          select: {
            name: true,
            creator: {
              select: {
                nick: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            nick: true,
          },
        },
      },
    })
    return userTreePermissions
  })
