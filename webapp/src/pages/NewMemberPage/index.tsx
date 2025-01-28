import { zCreateMemberTrpcInput } from '@familytree/backend/src/router/createMember/input'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { useForm } from '../../lib/form'
import { trpc } from '../../lib/trpc'

export const NewMemberPage = () => {
  const createMember = trpc.createMember.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      lastName: '',
      firstName: '',
      middleName: '',
      text: '',
    },
    validationSchema: zCreateMemberTrpcInput,
    successMessage: 'Member created!',
    showValidationAlert: true,
    onSubmit: async (values) => {
      await createMember.mutateAsync(values)
    },
  })

  return (
    <Segment title="New Member">
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
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Member</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
