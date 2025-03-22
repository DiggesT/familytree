import { useEffect, useState } from 'react'
import { Alert } from '../../../components/Alert'
import { Segment } from '../../../components/Segment'
import { Select } from '../../../components/Select'
import { BinaryTree } from '../../../components/Trees/BinaryTree'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const ShowTreePage = withPageWrapper({
  title: 'Show Tree',
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  const { data: userTreePermissions } = trpc.getTreeByPermission.useQuery({
    userId: me.id,
    permissions: ['OWNER', 'VIEWER'],
  })

  const [treeSelected, setTreeSelected] = useState<string>(userTreePermissions ? userTreePermissions[0].treeId : '')
  useEffect(() => {
    // TODO: I think this should work without useEffect
    userTreePermissions ? setTreeSelected(userTreePermissions[0].treeId) : setTreeSelected('')
  }, [userTreePermissions])

  const { data: memberData } = trpc.getMembers.useQuery({ treeId: treeSelected, limit: 100 }) // TODO: unlimited

  const userTreePermissionsOptions = userTreePermissions?.map((value) => (
    <option key={value.id} value={value.treeId}>
      {value.tree.name}
    </option>
  ))

  return (
    // TODO: Should I do something with title treeData possibly undefined?
    <Segment title={userTreePermissions?.length ? 'Show Tree' : 'Trees not found'}>
      {userTreePermissions !== undefined && userTreePermissions.length > 0 ? (
        <>
          <Select
            name="tree"
            label="Choose Tree"
            disabled={false}
            options={userTreePermissionsOptions}
            defaultValue={treeSelected}
            onChange={(e) => {
              e.preventDefault()
              setTreeSelected(e.target.value)
            }}
          />

          {memberData && memberData.members.length > 0 ? (
            // TODO: add more show tree variants
            <BinaryTree dataMembers={memberData.members} />
          ) : (
            <div className={css.alert}>
              <Alert color="brown">There are no members to create a tree.</Alert>
            </div>
          )}
        </>
      ) : (
        <Alert color="brown">First you need to create a tree or be invited.</Alert>
      )}
    </Segment>
  )
})
