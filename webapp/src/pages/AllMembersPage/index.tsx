import { Link } from 'react-router-dom'
import { getViewMemberRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

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
      <h1>All Members</h1>
      {data?.members.map((member) => {
        return (
          <div key={member.id}>
            <h2>
              <Link to={getViewMemberRoute({ memberId: member.id })}>{member.name}</Link>
            </h2>
            <p>{member.description}</p>
          </div>
        )
      })}
    </div>
  )
}
