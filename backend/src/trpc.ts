import { initTRPC } from '@trpc/server'
import _ from 'lodash'

const members = _.times(20, (i) => ({
  id: i.toString(),
  name: `Name ${i}`,
  description: `Role ${i}`,
  text: _.times(100, () => 'Some description text.').join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getMembers: trpc.procedure.query(() => {
    return { members: members.map((member) => _.pick(member, ['id', 'name', 'description'])) }
  }),
})

export type TrpcRouter = typeof trpcRouter
