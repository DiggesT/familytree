import { zEnumPermissions, zStringRequired } from '@familytree/shared/src/zod'
import { z } from 'zod'

export const zSetTreePermissionTrpcInput = z.object({
  userId: zStringRequired('User Id is required.'),
  treeId: zStringRequired('Tree Id is required.'),
  permission: zEnumPermissions('Permission is required.'),
})
