import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zGetTreeByPermissionTrpcInput } from './input'

export const getTreeByPermissionTrpcRoute = trpcLoggedProcedure
  .input(zGetTreeByPermissionTrpcInput)
  .query(async ({ ctx, input }) => {
    const userTreePermissions = await ctx.prisma.userTreePermissions.findMany({
      where: {
        userId: input.userId,
        permissions: { has: input.permission },
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
            nick: true,
          },
        },
      },
    })
    return { userTreePermissions }
  })
