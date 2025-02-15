import { Alert } from '../../../components/Alert'
import { Segment } from '../../../components/Segment'
import { BinaryTree } from '../../../components/Trees/BinaryTree'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

export const ShowTreePage = withPageWrapper({
  title: 'Show Tree',
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  const { data } = trpc.getMembers.useQuery({ creator: me.id, limit: 100 }) // TODO: unlimited

  return (
    <Segment title="Tree Name">
      {data && data.members.length > 0 ? ( // TODO: add more show tree variants
        <BinaryTree dataMembers={data.members}></BinaryTree>
      ) : (
        <Alert color="brown">There are no members to create a tree.</Alert>
      )}
    </Segment>
  )
})
