import { type Member, type User } from '@prisma/client'
import _ from 'lodash'
import { createAppContext } from '../lib/ctx'
import { createTrpcCallerFactory, getTrpcContext } from '../lib/trpc'
import { trpcRouter } from '../router'
import { deepMap } from '../utils/deepMap'
import { getPasswordHash } from '../utils/getPasswordHash'
import { type ExpressRequest } from '../utils/types'

export const appContext = createAppContext()

afterAll(appContext.stop)

beforeEach(async () => {
  await appContext.prisma.user.deleteMany()
  await appContext.prisma.tree.deleteMany()
  await appContext.prisma.member.deleteMany()
  await appContext.prisma.userTreePermissions.deleteMany()
})

export const getTrpcCaller = (user?: User) => {
  const req = { user } as ExpressRequest
  const createCaller = createTrpcCallerFactory(trpcRouter)
  return createCaller(getTrpcContext({ appContext, req }))
}

export const withoutNoize = (input: any): any => {
  return deepMap(input, ({ value }) => {
    if (_.isObject(value) && !_.isArray(value)) {
      return _.entries(value).reduce((acc, [objectKey, objectValue]: [string, any]) => {
        if ([/^id$/, /Id$/, /At$/].some((regex) => regex.test(objectKey))) {
          return acc
        }
        return {
          ...acc,
          [objectKey]: objectValue,
        }
      }, {})
    }
    return value
  })
}

export const createUser = async ({ user = {}, number = 1 }: { user?: Partial<User>; number?: number } = {}) => {
  return await appContext.prisma.user.create({
    data: {
      nick: `user${number}`,
      email: `user${number}@example.com`,
      password: getPasswordHash(user.password || '1234'),
      ..._.omit(user, ['password']),
    },
  })
}

export const createMember = async ({
  member = {},
  creator,
  number = 1,
}: {
  member?: Partial<Member>
  creator: Pick<User, 'id'>
  number?: number
}) => {
  return await appContext.prisma.member.create({
    data: {
      lastName: `LastName ${number}`,
      firstName: `FirstName ${number}`,
      middleName: `MiddleName ${number}`,
      treeId: `TreeId_${creator.id}`,
      createdBy: creator.id,
      text: `Member ${number} text text text text text text text text text text text text text text text text text text text text text`,
      mother: '',
      father: '',
      ...member,
    },
  })
}

export const createMemberWithAuthor = async ({
  member,
  creator,
  number,
}: {
  member?: Partial<Member>
  creator?: Partial<User>
  number?: number
} = {}) => {
  const createdUser = await createUser({ user: creator, number })
  const createdMember = await createMember({ member, creator: createdUser, number })
  return {
    author: createdUser,
    member: createdMember,
  }
}

// export const createIdeaLike = async ({ TODO: createUserTreePermission and test
//   idea,
//   liker,
//   createdAt,
// }: {
//   idea: Pick<Idea, 'id'>
//   liker: Pick<User, 'id'>
//   createdAt?: Date
// }) => {
//   return await appContext.prisma.ideaLike.create({
//     data: {
//       ideaId: idea.id,
//       userId: liker.id,
//       createdAt,
//     },
//   })
// }
