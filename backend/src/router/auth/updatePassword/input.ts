import { zStringRequired } from '@familytree/shared/src/zod'
import { z } from 'zod'

export const zUpdatePasswordTrpcInput = z.object({
  oldPassword: zStringRequired('Old password is required.'),
  newPassword: zStringRequired('New password is required.'),
})
