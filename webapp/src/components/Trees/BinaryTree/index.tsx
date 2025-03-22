import { type TrpcRouterOutput } from '@familytree/backend/src/router'
import { useState } from 'react'
import { Select } from '../../../components/Select'
import { TreeMemberIcon } from '../SVG/TreeMemberIcon'
import { groupMembersByLevel, setMemberLevel } from '../setMemberLevel/setMemberLevel'
import css from './index.module.scss'

export const BinaryTree = ({ dataMembers }: { dataMembers: TrpcRouterOutput['getMembers']['members'] }) => {
  const [currentMember, setCurrenMember] = useState<{ id: string; mother: string; father: string; name: string }>({
    id: '',
    mother: '',
    father: '',
    name: '',
  })

  const members = dataMembers.map((member) => {
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

  const memberOptions = dataMembers.map((member, index) => (
    <option key={index} value={member.id}>
      {member.lastName} {member.firstName} {member.middleName}
    </option>
  ))

  const membersWithLevel = groupMembersByLevel(setMemberLevel(currentMember, members, 0), 0)

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
    <>
      <div>
        <Select
          name="members"
          label="Select member"
          disabled={false}
          options={memberOptions}
          defaultValue={currentMember.id}
          onChange={(e) => {
            e.preventDefault()
            const selectedMember = members.find((member) => member.id === e.target.value)
            selectedMember && setCurrenMember(selectedMember)
          }}
        />
      </div>
      <div>
        <svg className={css.tree} xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={height}>
          {tree}
          {branches}
        </svg>
      </div>
    </>
  )
}
