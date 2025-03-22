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
import { UploadsToCloudinary } from '../../../components/UploadsToCloudinary'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getEditMemberRoute, getViewMemberRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'

const getChildrensOptions = ({ treeId }: { treeId: string }): JSX.Element[] => {
  const { data } = trpc.getMembers.useQuery({ treeId })
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
    initialValues: pick(member, ['id', 'lastName', 'firstName', 'middleName', 'text', 'mother', 'father', 'images']),
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
          <Select // TODO: fix empty select when first time edit member
            name="mother"
            label="Mother"
            disabled={formik.isSubmitting}
            options={getChildrensOptions({ treeId: member.treeId })}
            defaultValue={member.mother} // TODO: maybe it's possible to use formik
            onChange={(e) => {
              void formik.setFieldValue('mother', e.target.value) // TODO: use select 'name' parameter
            }}
          />
          <Select // TODO: same as mother select
            name="father"
            label="Father"
            disabled={formik.isSubmitting}
            options={getChildrensOptions({ treeId: member.treeId })}
            defaultValue={member.father} // TODO: same as mother select
            onChange={(e) => {
              void formik.setFieldValue('father', e.target.value) // TODO: same as mother select
            }}
          />
          <Textarea name="text" label="Text" formik={formik} />
          <UploadsToCloudinary label="Images" name="images" type="image" preset="preview" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Member</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
