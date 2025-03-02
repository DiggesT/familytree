/* eslint-disable node/no-process-env */
import { z } from 'zod'
import { zEnvNonemptyTrimmed } from './zod'

const sharedEnvRaw = {
  CLOUDINARY_CLOUD_NAME: process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  WEBAPP_URL: process.env.VITE_WEBAPP_URL || process.env.WEBAPP_URL,
}

const zEnv = z.object({
  CLOUDINARY_CLOUD_NAME: zEnvNonemptyTrimmed,
  WEBAPP_URL: zEnvNonemptyTrimmed,
})

export const sharedEnv = zEnv.parse(sharedEnvRaw)
