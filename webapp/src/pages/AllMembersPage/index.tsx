import { Link } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { getViewMemberRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const AllMembersPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMembers.useQuery()

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Segment title="All Members">
      <div className={css.members}>
        {data.members.map((member) => (
          <div className={css.member} key={member.id}>
            <Segment
              size={2}
              title={
                <Link className={css.memberLink} to={getViewMemberRoute({ id: member.id })}>
                  {`${member.firstName} ${member.lastName}`}
                </Link>
              }
              description={member.role}
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
