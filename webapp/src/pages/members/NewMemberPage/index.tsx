import { zCreateMemberTrpcInput } from '@familytree/backend/src/router/members/createMember/input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Textarea } from '../../../components/Textarea'
import { UploadsToCloudinary } from '../../../components/UploadsToCloudinary'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

export const NewMemberPage = withPageWrapper({
  authorizedOnly: true,
  title: 'New Member',
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  const { data: treeData } = trpc.getTree.useQuery({ creator: me.id })
  const treeId = treeData?.tree?.id ? treeData.tree.id : '' // TODO: find better way to be confident in existing treeId

  const createMember = trpc.createMember.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      lastName: '',
      firstName: '',
      middleName: '',
      text: '',
      images: [],
    },
    validationSchema: zCreateMemberTrpcInput.omit({ treeId: true }),
    successMessage: 'Member created!',
    showValidationAlert: true,
    onSubmit: async (values) => {
      await createMember.mutateAsync({ ...values, treeId })
    },
  })

  return (
    <Segment title="New Member">
      {treeData?.tree === null ? (
        <Alert color="brown">First you need to create a tree.</Alert>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            formik.handleSubmit()
          }}
        >
          <FormItems>
            <Input name="lastName" label="Last Name" formik={formik} />
            <Input name="firstName" label="First Name" formik={formik} />
            <Input name="middleName" label="Middle Name" formik={formik} />
            <Textarea name="text" label="Text" formik={formik} />
            <UploadsToCloudinary label="Images" name="images" type="image" preset="preview" formik={formik} />
            <Alert {...alertProps} />
            <Button {...buttonProps}>Create Member</Button>
          </FormItems>
        </form>
      )}
    </Segment>
  )
})
