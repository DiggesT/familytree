import { trim } from 'lodash'
import { trpc } from './trpc'

export const getParentsNames = (parentId: string): string => {
  const { data } = trpc.getMember.useQuery({ id: parentId })
  if (data === undefined || data.member === null) {
    return 'Parent not found.'
  }
  return trim(`${data.member.lastName} ${data.member.firstName} ${data.member.middleName}`)
}
