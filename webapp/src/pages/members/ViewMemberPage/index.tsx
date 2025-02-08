import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../../components/Button'
import { Segment } from '../../../components/Segment'
import { getParentsNames } from '../../../lib/getParentsNames'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getEditMemberRoute, type ViewMemberRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const ViewMemberPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { memberId } = useParams() as ViewMemberRouteParams
    return trpc.getMember.useQuery({
      id: memberId,
    })
  },

  setProps: ({ queryResult, ctx, checkExists }) => ({
    member: checkExists(queryResult.data.member, 'Member not found.'),
    me: ctx.me,
  }),
  title: ({ member }) => `${member.lastName} ${member.firstName} ${member.middleName}`,
})(({ member, me }) => {
  return (
    <Segment title={`${member.lastName} ${member.firstName} ${member.middleName}`}>
      <div className={css.createdAt}>Created At: {format(member.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.createdBy}>
        Created By: {member.creator.nick} {member.creator.name ? `(${member.creator.name})` : ''}
      </div>
      <div className={css.parents}>Mother: {getParentsNames(member.mother)}</div>
      <div className={css.parents}>Father: {getParentsNames(member.father)}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: member.text }} />
      {me?.id === member.createdBy && (
        <div className={css.editButton}>
          <LinkButton to={getEditMemberRoute({ memberId: member.id })}>Edit Member</LinkButton>
        </div>
      )}
    </Segment>
  )
})
