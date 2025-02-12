import { Segment } from '../../../components/Segment'
import { TreeMemberIcon } from '../../../components/Tree'
import { setMemberLevel, groupMembersByLevel } from '../../../lib/setMemberLevel'
import { trpc } from '../../../lib/trpc'

export const ShowTreePage = () => {
  const { data } = trpc.getMembers.useQuery({ creator: 'f1ed7244-a4c9-4d30-9409-77bea03d6d80', limit: 100 }) // TODO: set creator with pageWrapper - getAuthMe

  if (!data?.members) {
    return <></>
  }

  const members = data.members
    .map((member) => {
      return {
        id: member.id,
        mother: member.mother,
        father: member.father,
        name: `${member.lastName} ${member.firstName}`,
      }
    })
    // TODO: remove this filter
    .filter(
      (member) =>
        member.id !== '72a32a50-23ab-416a-b308-e68e5c2ff838' && member.id !== '1e8c979b-5275-4c7b-9ad8-d11126183590'
    )

  const membersWithLevel = groupMembersByLevel(setMemberLevel(members[members.length - 1], members, 0), 0) // TODO: find current member

  const maxLevel = membersWithLevel.length

  const tree = membersWithLevel.map((memberLevel, indexLevel) =>
    memberLevel.map((member, index) => (
      <TreeMemberIcon
        key={member.id}
        name={member.name}
        y={indexLevel * 150}
        x={75 * (2 ** (maxLevel - indexLevel - 1) - 1) + 75 * 2 ** (maxLevel - indexLevel) * index}
      />
    ))
  )

  const branches = membersWithLevel.map((memberLevel, indexLevel) =>
    memberLevel.map((_member, index) => {
      if (indexLevel === 0) {
        return <></> // TODO: skip branch for root member
      }
      return (
        <line
          x1={75 * (2 ** (maxLevel - indexLevel - 1) - 1) + 75 * 2 ** (maxLevel - indexLevel) * index + 50}
          y1={indexLevel * 150}
          x2={
            75 * (2 ** (maxLevel - indexLevel - 1) - 1) +
            75 * 2 ** (maxLevel - indexLevel) * index +
            50 +
            75 * 2 ** (maxLevel - indexLevel - 1) * (index % 2 === 1 ? -1 : 1)
          }
          y2={indexLevel * 150 - 50}
          stroke="black"
          fill="transparent"
          stroke-width="2"
        />
      )
    })
  )

  return (
    <Segment title="Tree Name">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000" height="550">
          {tree}
          {branches}
        </svg>
      </div>
    </Segment>
  )
}
