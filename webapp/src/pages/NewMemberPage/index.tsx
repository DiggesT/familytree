import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'

export const NewMemberPage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      role: '',
      text: '',
    },
    validate: withZodSchema(
      z.object({
        firstName: z.string().min(1, 'First Name is required'),
        lastName: z.string().min(1, 'Last Name is required'),
        role: z.string().min(1, 'Role is required'),
      })
    ),
    onSubmit: (values) => {
      console.info('Submitted', values)
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
        <button type="submit">Create Member</button>
      </form>
    </Segment>
  )
}
