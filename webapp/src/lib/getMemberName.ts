import { trim } from 'lodash'
import { trpc } from './trpc'

export function getMemberName(memberId: string): string | undefined {
  const { data } = trpc.getMember.useQuery({ id: memberId })
  if (data === undefined || data.member === null) {
    return undefined
  }
  return trim(`${data.member.lastName} ${data.member.firstName} ${data.member.middleName}`)
}
