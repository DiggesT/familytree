import { getNewMemberRoute } from '@familytree/webapp/src/lib/routes'
import { type User } from '@prisma/client'
import { sendEmail } from './utils'

export const sendWelcomeEmail = async ({ user }: { user: Pick<User, 'nick' | 'email'> }) => {
  return await sendEmail({
    to: user.email,
    subject: 'Thanks For Registration!',
    templateName: 'welcome',
    templateVariables: {
      userNick: user.nick,
      addIdeaUrl: getNewMemberRoute({ abs: true }),
    },
  })
}
