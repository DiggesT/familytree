import { Link } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Segment } from '../../../components/Segment'
import { getViewMemberRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const AllMembersPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getMembers.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title="All Members">
      {isLoading || isRefetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.members}>
          {data.pages
            .flatMap((page) => page.members)
            .map((member) => (
              <div className={css.member} key={member.id}>
                <Segment
                  size={2}
                  title={
                    <Link className={css.memberLink} to={getViewMemberRoute({ memberId: member.id })}>
                      {`${member.lastName} ${member.firstName} ${member.middleName}`}
                    </Link>
                  }
                />
              </div>
            ))}
          <div className={css.more}>
            {hasNextPage && !isFetchingNextPage && (
              <button
                onClick={() => {
                  void fetchNextPage()
                }}
              >
                Load more
              </button>
            )}
            {isFetchingNextPage && <span>Loading...</span>}
          </div>
        </div>
      )}
    </Segment>
  )
}
