import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zGetTreeTrpcInput } from './input'

export const getTreeTrpcRoute = trpcLoggedProcedure.input(zGetTreeTrpcInput).query(async ({ ctx, input }) => {
  // TODO: find all trees
  // TODO: (? - getTreeByPermissionTrpcRoute) return tree with user permissions for it
  const tree = await ctx.prisma.tree.findFirst({
    where: {
      createdBy: input.creator,
    },
  })
  return { tree }
})
