import _ from 'lodash'
import { members } from '../../lib/members'
import { trpc } from '../../lib/trpc'

export const getMembersTrpcRoute = trpc.procedure.query(() => {
  return { members: members.map((member) => _.pick(member, ['id', 'firstName', 'lastName', 'role'])) }
})
