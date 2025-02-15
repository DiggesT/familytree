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
  const { data: memberData } = trpc.getMembers.useQuery({ creator: me.id, limit: 100 }) // TODO: unlimited
  const { data: treeData } = trpc.getTree.useQuery({ creator: me.id })

  return (
    // TODO: Should I do something with title treeData possibly undefined?
    <Segment title={treeData?.tree ? treeData.tree.name : 'Tree not found'}>
      {treeData?.tree === null ? (
        <Alert color="brown">First you need to create a tree.</Alert>
      ) : memberData && memberData.members.length > 0 ? (
        // TODO: add more show tree variants
        <BinaryTree dataMembers={memberData.members} />
      ) : (
        <Alert color="brown">There are no members to create a tree.</Alert>
      )}
    </Segment>
  )
})
