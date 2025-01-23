import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createMemberTrpcRoute } from './createMember'
import { getMeTrpcRoute } from './getMe'
import { getMemberTrpcRoute } from './getMember'
import { getMembersTrpcRoute } from './getMembers'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createMember: createMemberTrpcRoute,
  getMe: getMeTrpcRoute,
  getMember: getMemberTrpcRoute,
  getMembers: getMembersTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
