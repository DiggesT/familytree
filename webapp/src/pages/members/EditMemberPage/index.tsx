import { zUpdateMemberTrpcInput } from '@familytree/backend/src/router/members/updateMember/input'
import { pick } from '@familytree/shared/src/pick'
import { useNavigate } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Select } from '../../../components/Select'
import { Textarea } from '../../../components/Textarea'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getEditMemberRoute, getViewMemberRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'

const getChildrensOptions = ({ creator }: { creator: string }): JSX.Element[] => {
  const { data } = trpc.getMembers.useQuery({ creator })
  if (!data || data.members.length === 0) {
    return [<option key="empty">Empty</option>]
  }
  const childrens = data.members.map((member) => {
    return (
      <option value={member.id} key={member.id}>
        {member.lastName} {member.firstName} {member.middleName}
      </option>
    )
  })
  return childrens
}

export const EditMemberPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { memberId } = getEditMemberRoute.useParams()
    return trpc.getMember.useQuery({
      id: memberId,
    })
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const member = checkExists(queryResult.data.member, 'Member not found.')
    checkAccess(ctx.me?.id === member.createdBy, 'An member can only be edited by the creator.')
    return { member, ctx }
  },
  title: ({ member }) => `Edit Member "${member.lastName} ${member.firstName} ${member.middleName}"`,
})(({ member }) => {
  const navigate = useNavigate()
  const updateMember = trpc.updateMember.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(member, ['id', 'lastName', 'firstName', 'middleName', 'text', 'mother', 'father']), // TODO: pick M and F
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
          <Select
            name="mother"
            label="Mother"
            formik={formik}
            options={getChildrensOptions({ creator: member.creator.id })} // TODO: is it correct to use member.creator, instead of me.id?
            defaultValue={member.mother} // TODO: maybe it's possible to use formik
          />
          <Select
            name="father"
            label="Father"
            formik={formik}
            options={getChildrensOptions({ creator: member.creator.id })} // TODO: same as mother select
            defaultValue={member.father} // TODO: same as mother select
          />
          <Textarea name="text" label="Text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Member</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
