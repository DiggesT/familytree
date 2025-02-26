import { cloudinaryUploadTypes } from '@familytree/shared/src/cloudinary'
import { getKeysAsArray } from '@familytree/shared/src/getKeysAsArray'
import { z } from 'zod'

export const zPrepareCloudinaryUploadTrpcInput = z.object({
  type: z.enum(getKeysAsArray(cloudinaryUploadTypes)),
})
