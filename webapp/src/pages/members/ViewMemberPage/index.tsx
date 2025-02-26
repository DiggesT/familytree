import { getAvatarUrl } from '@familytree/shared/src/cloudinary'
import { format } from 'date-fns'
import { LinkButton } from '../../../components/Button'
import { Segment } from '../../../components/Segment'
import { getMemberName } from '../../../lib/getMemberName'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getEditMemberRoute, getViewMemberRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const ViewMemberPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { memberId } = getViewMemberRoute.useParams()
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
        <img className={css.avatar} alt="" src={getAvatarUrl(member.creator.avatar, 'small')} />
        <div className={css.name}>
          Created By:
          <br />
          {member.creator.nick}
          {member.creator.name ? `(${member.creator.name})` : ''}
        </div>
      </div>
      <div className={css.parents}>
        Mother: {member.mother ? getMemberName(member.mother) || 'Not found.' : 'Empty.'}
      </div>
      <div className={css.parents}>
        Father: {member.father ? getMemberName(member.father) || 'Not found.' : 'Empty.'}
      </div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: member.text }} />
      {me?.id === member.createdBy && (
        <div className={css.editButton}>
          <LinkButton to={getEditMemberRoute({ memberId: member.id })}>Edit Member</LinkButton>
        </div>
      )}
    </Segment>
  )
})
