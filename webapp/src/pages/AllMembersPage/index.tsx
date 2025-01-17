import { Link } from 'react-router-dom'
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
    <div>
      <h1 className={css.title}>All Members</h1>
      <div className={css.members}>
        {data.members.map((member) => (
          <div className={css.member} key={member.id}>
            <h2 className={css.memberName}>
              <Link className={css.memberLink} to={getViewMemberRoute({ id: member.id })}>
                {member.name}
              </Link>
            </h2>
            <p className={css.memberRole}>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
