import { type TrpcRouterOutput } from '@familytree/backend/src/router'
import { zUpdateMemberTrpcInput } from '@familytree/backend/src/router/updateMember/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { pick } from 'lodash'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { getViewMemberRoute, type EditMemberRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditMemberComponent = ({ member }: { member: NonNullable<TrpcRouterOutput['getMember']['member']> }) => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const updateMember = trpc.updateMember.useMutation()

  const formik = useFormik({
    initialValues: pick(member, ['id', 'lastName', 'firstName', 'middleName', 'text']),
    validate: withZodSchema(zUpdateMemberTrpcInput.omit({ memberId: true })),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await updateMember.mutateAsync({ memberId: member.id, ...values })
        await navigate(getViewMemberRoute({ memberId: member.id }))
      } catch (err: any) {
        setSubmittingError(err.message)
      }
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
          {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid.</div>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update Member</Button>
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

  const getMeResult = trpc.getMe.useQuery()

  if (getMemberResult.isLoading || getMemberResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getMemberResult.isError) {
    return <span>Error: {getMemberResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getMemberResult.data.member) {
    return <span>Member not found.</span>
  }

  const member = getMemberResult.data.member
  const me = getMeResult.data.me

  if (!me) {
    return <span>Only for authorized.</span>
  }

  if (me.id !== member.createdBy) {
    return <span>An member can only be edited by the creator.</span>
  }

  return <EditMemberComponent member={member} />
}
