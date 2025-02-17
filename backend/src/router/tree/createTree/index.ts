import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zCreateTreeTrpcInput } from './input'

export const createTreeTrpcRoute = trpcLoggedProcedure.input(zCreateTreeTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw Error('Unauthorized (zCreateTreeTrpcInput).')
  }

  // TODO: only one tree for firts time
  const createdTree = await ctx.prisma.tree.findFirst({
    where: {
      createdBy: ctx.me.id,
    },
  })
  if (createdTree) {
    throw new Error(`You already have a tree: "${createdTree.name}"`)
  }

  const newTree = await ctx.prisma.tree.create({ data: { ...input, createdBy: ctx.me.id } })
  await ctx.prisma.userTreePermissions.create({
    data: { userId: ctx.me.id, treeId: newTree.id, permissions: ['OWNER'] },
  })
  return true
})
