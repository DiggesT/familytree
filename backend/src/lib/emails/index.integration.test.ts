import { createUser, withoutNoize } from '../../test/integration'
import { sendEmail } from './utils'

const createData = async () => {
  await createUser({ user: { nick: 'User1', name: 'User 1', email: 'user1@email.com' } })
  await createUser({ user: { nick: 'User2', name: 'User 2', email: 'user2@email.com' } })
}

describe('Send', () => {
  it('Welcome Email', async () => {
    await createData()
    expect(sendEmail).toHaveBeenCalledTimes(2)
    const calls = jest.mocked(sendEmail).mock.calls
    const prettifiedCallProps = calls.map(([props]) => withoutNoize(props))
    expect(prettifiedCallProps).toMatchInlineSnapshot(`
[
  {
    "subject": "Thanks For Registration!",
    "templateName": "welcome",
    "templateVariables": {
      "addIdeaUrl": "http://localhost:8000/members/new",
      "userNick": "User1",
    },
    "to": "user1@email.com",
  },
  {
    "subject": "Thanks For Registration!",
    "templateName": "welcome",
    "templateVariables": {
      "addIdeaUrl": "http://localhost:8000/members/new",
      "userNick": "User2",
    },
    "to": "user2@email.com",
  },
]
`)
  })
})
