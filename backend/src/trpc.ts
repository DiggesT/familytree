import { initTRPC } from '@trpc/server'

const members = [
  { id: '1', name: 'Selezneva Elena', description: 'Mother' },
  { id: '2', name: 'Parkhomenko Borris', description: 'Father' },
]

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getMembers: trpc.procedure.query(() => {
    return { members }
  }),
})

export type TrpcRouter = typeof trpcRouter
