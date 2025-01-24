import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { getEditMemberRoute, type ViewMemberRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewMemberPage = () => {
  const { memberId } = useParams() as ViewMemberRouteParams

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

  return (
    <Segment title={`${member.lastName} ${member.firstName} ${member.middleName}`}>
      <div className={css.createdAt}>Created At: {format(member.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.createdBy}>Created By: {member.creator.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: member.text }} />
      {me?.id === member.createdBy && (
        <div className={css.editButton}>
          <LinkButton to={getEditMemberRoute({ memberId: member.id })}>Edit Member</LinkButton>
        </div>
      )}
    </Segment>
  )
}
