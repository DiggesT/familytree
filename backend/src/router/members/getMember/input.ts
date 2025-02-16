import { zStringRequired } from '@familytree/shared/src/zod'
import { z } from 'zod'

export const zGetMemberTrpcInput = z.object({ id: zStringRequired() })
