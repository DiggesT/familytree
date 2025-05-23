import { type TrpcRouterOutput } from '@familytree/backend/src/router'
import { zUpdatePasswordTrpcInput } from '@familytree/backend/src/router/auth/updatePassword/input'
import { zUpdateProfileTrpcInput } from '@familytree/backend/src/router/auth/updateProfile/input'
import { zPasswordsMustBeTheSame, zStringRequired } from '@familytree/shared/src/zod'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { UploadToCloudinary } from '../../../components/UploadToCloudinary'
import { useForm } from '../../../lib/form'

import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

const General = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']['me']> }) => {
  const trpcUtils = trpc.useUtils()
  const updateProfile = trpc.updateProfile.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: me.nick,
      name: me.name,
      avatar: me.avatar,
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values)
      trpcUtils.getMe.setData(undefined, { me: updatedMe })
    },
    successMessage: 'Profile updated.',
    resetOnSuccess: false,
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Name" name="name" formik={formik} />
        <UploadToCloudinary label="Avatar" name="avatar" type="avatar" preset="big" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Profile</Button>
      </FormItems>
    </form>
  )
}

const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: zStringRequired('New password again is required.'),
      })
      .superRefine(zPasswordsMustBeTheSame('newPassword', 'newPasswordAgain')),

    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword })
    },
    successMessage: 'Password updated.',
    resetOnSuccess: true,
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="Old Password" name="oldPassword" formik={formik} type="password" />
        <Input label="New Password" name="newPassword" formik={formik} type="password" />
        <Input label="New Password Again" name="newPasswordAgain" formik={formik} type="password" />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Password</Button>
      </FormItems>
    </form>
  )
}

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
  title: 'Edit Profile',
})(({ me }) => {
  return (
    <>
      <Segment title="Edit Profile">
        <Segment title="General" size={2}>
          <General me={me} />
        </Segment>
        <Segment title="Password" size={2}>
          <Password />
        </Segment>
      </Segment>
    </>
  )
})
