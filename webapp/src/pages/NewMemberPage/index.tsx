import { zCreateMemberTrpcInput } from '@familytree/backend/src/router/createMember/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { trpc } from '../../lib/trpc'

export const NewMemberPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
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
      try {
        await createMember.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
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
          <Input name="firstName" label="First Name" formik={formik} />
          <Input name="lastName" label="Last Name" formik={formik} />
          <Input name="role" label="Role" formik={formik} maxWidth={400} />
          <Textarea name="text" label="Text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">Member created!</Alert>}
          <Button loading={formik.isSubmitting}>Create Member</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
