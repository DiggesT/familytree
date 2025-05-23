import { zEnumPermissions, zStringRequired } from '@familytree/shared/src/zod'
import { z } from 'zod'

export const zGetTreeByPermissionTrpcInput = z.object({
  userId: zStringRequired('User Id is required.'),
  permissions: zEnumPermissions('Permission is required.').array(),
})
