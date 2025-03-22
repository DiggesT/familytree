import { zCreateTreeTrpcInput } from '@familytree/backend/src/router/tree/createTree/input'
import { z } from 'zod'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

const CreateNewTree = () => {
  const createTree = trpc.createTree.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: { name: '' },
    validationSchema: zCreateTreeTrpcInput,
    successMessage: 'Tree created!',
    onSubmit: async (values) => {
      await createTree.mutateAsync(values)
    },
  })

  return (
    <Segment title={'Create New Tree'} size={2}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

const InviteToTree = ({ treeId }: { treeId: string }) => {
  const InviteToTree = trpc.setTreePermission.useMutation()
  const getUserByNick = trpc.getUserByNick.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: { userNick: '' },
    validationSchema: z.object({ userNick: z.string().min(1, 'User nick is required.') }),
    successMessage: 'Invitation sent!',
    onSubmit: async (values) => {
      // TODO: is this ok to use mutate?
      const user = await getUserByNick.mutateAsync({ nick: values.userNick })
      await InviteToTree.mutateAsync({ userId: user.id, treeId, permission: 'INVITED' })
    },
  })

  return (
    <Segment title={'Invite to Tree'} size={2}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="userNick" label="User Nick" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Invite</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

const Invitings = ({ userId }: { userId: string }) => {
  const { data: userTreePermissions } = trpc.getTreeByPermission.useQuery({ userId, permission: 'INVITED' })
  const invites =
    userTreePermissions && userTreePermissions?.userTreePermissions.length > 0 ? (
      <Segment title={'Invitings'} size={2}>
        {userTreePermissions.userTreePermissions.map((value) => (
          <span className={css.text} key={value.id}>
            User: {value.tree.creator.nick} invites you to his family tree: {value.tree.name}.
          </span>
        ))}
      </Segment>
    ) : (
      <Segment title={'Invitings'} size={2} description="There is no invitings yet." />
    )

  return invites
}

export const TreeManagerPage = withPageWrapper({
  title: 'New Tree',
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  const { data: treeData } = trpc.getTree.useQuery({ creator: me.id })

  return (
    <Segment title={'Tree Manager'}>
      {treeData?.tree ? (
        <Segment title={treeData.tree?.name} size={2} description="This is your family tree name." />
      ) : (
        <CreateNewTree />
      )}
      {treeData?.tree?.id ? (
        <InviteToTree treeId={treeData.tree.id} />
      ) : (
        <Segment title={'Invite to Tree'} size={2} description="First you need to create a tree." />
      )}
      <Invitings userId={me.id} />
    </Segment>
  )
})
