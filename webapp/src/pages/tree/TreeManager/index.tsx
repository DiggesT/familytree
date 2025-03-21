import { zCreateTreeTrpcInput } from '@familytree/backend/src/router/tree/createTree/input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

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

const InviteToTree = () => {
  return <Segment title={'Invite to Tree'} />
}

export const TreeManager = withPageWrapper({
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
      <InviteToTree />
      <Segment title={'Invitings'}></Segment>
    </Segment>
  )
})
