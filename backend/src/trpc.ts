import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const members = _.times(20, (i) => ({
  id: i.toString(),
  name: `Name ${i}`,
  description: `Role ${i}`,
  text: _.times(100, () => '<p>Some description text.</p>').join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getMembers: trpc.procedure.query(() => {
    return { members: members.map((member) => _.pick(member, ['id', 'name', 'description'])) }
  }),
  getMember: trpc.procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    const member = members.find((member) => member.id === input.id)
    return { member: member || null }
  }),
})

export type TrpcRouter = typeof trpcRouter
