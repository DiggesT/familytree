import { pick } from '@familytree/shared/src/pick'
import { type User } from '@prisma/client'

export const toClientMe = (user: User | null) => {
  return user && pick(user, ['id', 'nick', 'name', 'userpermissions', 'email'])
}
