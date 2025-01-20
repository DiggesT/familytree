import { zCreateMemberTrpcInput } from '@familytree/backend/src/router/createMember/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { trpc } from '../../lib/trpc'

export const NewMemberPage = () => {
  const createMember = trpc.createMember.useMutation()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      role: '',
      text: '',
    },
    validate: withZodSchema(zCreateMemberTrpcInput),
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
        <Input name="firstName" label="First Name" formik={formik} />
        <Input name="lastName" label="Last Name" formik={formik} />
        <Input name="role" label="Role" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Member'}
        </button>
      </form>
    </Segment>
  )
}
