import { trpc } from '../lib/trpc'
import { getMemberTrpcRoute } from './getMember'
import { getMembersTrpcRoute } from './getMembers'

export const trpcRouter = trpc.router({
  getMember: getMemberTrpcRoute,
  getMembers: getMembersTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
