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
  return (
    <Segment title="Show Tree">
      <span>Sorted and grouped array:</span>
      <div>
        {membersWithLevel.map((member, index) => (
          <p key={index}>Level: {member.map((value) => `${value.level} `)}</p>
        ))}
      </div>
    </Segment>
  )
}
