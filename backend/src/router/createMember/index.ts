import { z } from 'zod'
import { members } from '../../lib/members'
import { trpc } from '../../lib/trpc'

export const createMemberTrpcRoute = trpc.procedure
  .input(
    z.object({
      firstName: z.string().min(1, 'First Name is required'),
      lastName: z.string().min(1, 'Last Name is required'),
      role: z.string().min(1, 'Role is required'),
      text: z.string(),
    })
  )
  .mutation(({ input }) => {
    members.unshift({ ...input, id: members.length.toString() })
    return true
  })
