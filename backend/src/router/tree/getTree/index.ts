import { trpc } from '../../../lib/trpc'
import { zGetTreeTrpcInput } from './input'

export const getTreeTrpcRoute = trpc.procedure.input(zGetTreeTrpcInput).query(async ({ ctx, input }) => {
  // TODO: find all trees / return tree with user permissions for it
  const tree = await ctx.prisma.tree.findFirst({
    where: {
      createdBy: input.creator,
    },
  })
  return { tree }
})
