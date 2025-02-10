import { Segment } from '../../../components/Segment'
import { getTree, groupTree } from '../../../lib/getTree'
import { trpc } from '../../../lib/trpc'

export const ShowTreePage = () => {
  const { data } = trpc.getMembers.useQuery({ creator: 'f1ed7244-a4c9-4d30-9409-77bea03d6d80', limit: 100 })

  if (!data?.members) {
    return <></>
  }

  const arr = data.members.map((value) => {
    return { id: value.id, mother: value.mother, father: value.father }
  })
  const groupedArr = groupTree(getTree({ currentRow: arr[arr.length - 1], arr, depth: 0 }), 0)
  return (
    <Segment title="Show Tree">
      <span>Sorted and grouped array:</span>
      <div>
        {groupedArr.map((value, index) => (
          <p key={index}>Level: {value.map((value) => `${value.level} `)}</p>
        ))}
      </div>
    </Segment>
  )
}
