import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { createTrpcRouter } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getMeTrpcRoute } from './auth/getMe'
import { signInTrpcRoute } from './auth/signIn'
import { signUpTrpcRoute } from './auth/signUp'
import { updatePasswordTrpcRoute } from './auth/updatePassword'
import { updateProfileTrpcRoute } from './auth/updateProfile'
import { createMemberTrpcRoute } from './members/createMember'
import { getMemberTrpcRoute } from './members/getMember'
import { getMembersTrpcRoute } from './members/getMembers'
import { updateMemberTrpcRoute } from './members/updateMember'
import { createTreeTrpcRoute } from './tree/createTree'
import { getTreeTrpcRoute } from './tree/getTree'
// @endindex

export const trpcRouter = createTrpcRouter({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  createMember: createMemberTrpcRoute,
  getMember: getMemberTrpcRoute,
  getMembers: getMembersTrpcRoute,
  updateMember: updateMemberTrpcRoute,
  createTree: createTreeTrpcRoute,
  getTree: getTreeTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
