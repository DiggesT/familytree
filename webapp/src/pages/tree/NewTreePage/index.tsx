import { zCreateTreeTrpcInput } from '@familytree/backend/src/router/tree/createTree/input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

export const NewTreePage = withPageWrapper({ title: 'New Tree' })(() => {
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
    <Segment title={'New Tree'}>
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
})
