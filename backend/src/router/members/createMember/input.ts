import { zStringRequired } from '@familytree/shared/src/zod'
import { z } from 'zod'

export const zCreateMemberTrpcInput = z.object({
  treeId: zStringRequired(),
  lastName: zStringRequired('Last Name is required.'),
  firstName: zStringRequired('First Name is required.'),
  middleName: z.string(),
  text: z.string(),
  images: z.array(zStringRequired()),
})
