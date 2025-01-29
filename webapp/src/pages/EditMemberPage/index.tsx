import { type TrpcRouterOutput } from '@familytree/backend/src/router'
import { zUpdateMemberTrpcInput } from '@familytree/backend/src/router/updateMember/input'
import { pick } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { useMe } from '../../lib/ctx'
import { useForm } from '../../lib/form'
import { getViewMemberRoute, type EditMemberRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditMemberComponent = ({ member }: { member: NonNullable<TrpcRouterOutput['getMember']['member']> }) => {
  const navigate = useNavigate()
  const updateMember = trpc.updateMember.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(member, ['id', 'lastName', 'firstName', 'middleName', 'text']),
    validationSchema: zUpdateMemberTrpcInput.omit({ memberId: true }),
    resetOnSuccess: false,
    showValidationAlert: true,
    onSubmit: async (values) => {
      await updateMember.mutateAsync({ memberId: member.id, ...values })
      await navigate(getViewMemberRoute({ memberId: member.id }))
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
}

export const EditMemberPage = () => {
  const { memberId } = useParams() as EditMemberRouteParams

  const getMemberResult = trpc.getMember.useQuery({
    id: memberId,
  })

  const me = useMe()

  if (getMemberResult.isLoading || getMemberResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getMemberResult.isError) {
    return <span>Error: {getMemberResult.error.message}</span>
  }

  if (!getMemberResult.data.member) {
    return <span>Member not found.</span>
  }

  const member = getMemberResult.data.member

  if (!me) {
    return <span>Only for authorized.</span>
  }

  if (me.id !== member.createdBy) {
    return <span>An member can only be edited by the creator.</span>
  }

  return <EditMemberComponent member={member} />
}
