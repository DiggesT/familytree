import { zUpdateMemberTrpcInput } from '@familytree/backend/src/router/members/updateMember/input'
import { pick } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Textarea } from '../../../components/Textarea'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getViewMemberRoute, type EditMemberRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'

export const EditMemberPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { memberId } = useParams() as EditMemberRouteParams
    return trpc.getMember.useQuery({
      id: memberId,
    })
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const member = checkExists(queryResult.data.member, 'Member not found.')
    checkAccess(ctx.me?.id === member.createdBy, 'An member can only be edited by the creator.')
    return { member }
  },
})(({ member }) => {
  const navigate = useNavigate()
  const updateMember = trpc.updateMember.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(member, ['id', 'lastName', 'firstName', 'middleName', 'text']),
    validationSchema: zUpdateMemberTrpcInput.omit({ memberId: true }),
    resetOnSuccess: false,
    showValidationAlert: true,
    onSubmit: async (values) => {
      await updateMember.mutateAsync({ memberId: member.id, ...values })
      void navigate(getViewMemberRoute({ memberId: member.id }))
    },
  })

  return (
    <Segment title="Edit Member">
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
          <Button {...buttonProps}>Update Member</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
