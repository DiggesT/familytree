import { z } from 'zod'

export const zEnvHost = z.enum(['local', 'production'])
export const zEnvNonemptyTrimmed = z.string().trim().min(1)
export const zEnvNonemptyTrimmedRequiredOnNotLocal = zEnvNonemptyTrimmed.optional().refine(
  // eslint-disable-next-line node/no-process-env
  (val) => process.env.HOST_ENV === 'local' || !!val,
  'Required on local host'
)

export const zStringRequired = (errorMessage?: string) =>
  z.string({ required_error: errorMessage || 'Please, fill it' }).min(1, errorMessage || 'Please, fill it')
export const zStringOptional = z.string().optional()
export const zEmailRequired = zStringRequired().email('Invalid email.')
export const zPasswordRequired = zStringRequired('Password is required.').max(8, 'Password should be 1-8 characters.')
export const zNickRequired = zStringRequired('Nick is required.').regex(
  /^[a-z0-9-]+$/,
  'Nick may contain only lowercase letters, numbers and dashes.'
)

export const zEnumPermissions = (message: string) => z.enum(['OWNER', 'COAUTHOR', 'VIEWER', 'INVITED'], { message })

export const zPasswordsMustBeTheSame =
  (passwordFieldName: string, passwordAgainFieldName: string) => (val: any, ctx: z.RefinementCtx) => {
    if (val[passwordFieldName] !== val[passwordAgainFieldName]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords must be the same.',
        path: [passwordAgainFieldName],
      })
    }
  }
