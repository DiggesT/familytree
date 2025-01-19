import { useFormik } from 'formik'
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
    validate: (values) => {
      const errors: Partial<typeof values> = {}
      if (!values.firstName) {
        errors.firstName = 'First Name is required'
      }
      if (!values.lastName) {
        errors.lastName = 'Last Name is required'
      }
      if (!values.role) {
        errors.role = 'Role is required'
      }
      return errors
    },
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
