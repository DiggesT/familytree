import Member from '../../../assets/images/memberIcon.svg?react'
import { Segment } from '../../../components/Segment'
import { setMemberLevel, groupMembersByLevel } from '../../../lib/setMemberLevel'
import { trpc } from '../../../lib/trpc'

export const ShowTreePage = () => {
  const { data } = trpc.getMembers.useQuery({ creator: 'f1ed7244-a4c9-4d30-9409-77bea03d6d80', limit: 100 })

  if (!data?.members) {
    return <></>
  }

  const members = data.members.map((member) => {
    return { id: member.id, mother: member.mother, father: member.father }
  })

  const membersWithLevel = groupMembersByLevel(setMemberLevel(members[members.length - 1], members, 0), 0)

  const tree = membersWithLevel.map((memberLevel, indexLevel) =>
    memberLevel.map((_member, index) => <Member y={indexLevel * 125} x={index * 150} />)
  )

  return (
    <Segment title="Tree Name">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="700" height="500">
          {tree}
        </svg>
      </div>
    </Segment>
  )
}
