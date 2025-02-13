import { useState } from 'react'
import { Segment } from '../../../components/Segment'
import { TreeMemberIcon } from '../../../components/Tree'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { setMemberLevel, groupMembersByLevel } from '../../../lib/setMemberLevel'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const ShowTreePage = withPageWrapper({
  title: 'Show Tree',
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  const [currentMember, setCurrenMember] = useState<{ id: string; mother: string; father: string; name: string }>({
    id: '',
    mother: '',
    father: '',
    name: '',
  })

  const { data } = trpc.getMembers.useQuery({ creator: me.id, limit: 100 })

  if (!data?.members && data?.members.length !== 0) {
    return <></>
  }

  const members = data.members.map((member) => {
    return {
      id: member.id,
      mother: member.mother,
      father: member.father,
      name: `${member.lastName} ${member.firstName}`,
    }
  })

  if (currentMember.id === '') {
    setCurrenMember(members[0])
  }

  const memberOptions = data.members.map((member, index) => (
    <option key={index} value={member.id}>
      {member.lastName} {member.firstName} {member.middleName}
    </option>
  ))

  const membersWithLevel = groupMembersByLevel(setMemberLevel(currentMember, members, 0), 0) // TODO: find current member

  const maxLevel = membersWithLevel.length
  const width = 100 + (2 ** (maxLevel - 1) - 1) * 150
  const height = 100 + (maxLevel - 1) * 150

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
    memberLevel.map((member, index) => {
      if (indexLevel === 0) {
        return undefined // TODO: skip branch for root member
      }
      return (
        <line
          key={member.id}
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
          strokeWidth="2"
        />
      )
    })
  )

  return (
    <Segment title="Tree Name">
      <div>
        {/* TODO: add styles for select */}
        <p>Select member:</p>
        <select
          defaultValue={currentMember.id}
          onChange={(e) => {
            e.preventDefault()
            const selectedMember = members.find((member) => member.id === e.target.value)
            selectedMember && setCurrenMember(selectedMember)
          }}
        >
          {memberOptions}
        </select>
      </div>
      <div className={css.tree}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={height}>
          {tree}
          {branches}
        </svg>
      </div>
    </Segment>
  )
})
