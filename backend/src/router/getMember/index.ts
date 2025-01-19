import { z } from 'zod'
import { members } from '../../lib/members'
import { trpc } from '../../lib/trpc'

export const getMemberTrpcRoute = trpc.procedure.input(z.object({ id: z.string() })).query(({ input }) => {
  const member = members.find((member) => member.id === input.id)
  return { member: member || null }
})
