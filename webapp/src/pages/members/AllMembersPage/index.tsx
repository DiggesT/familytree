import { zGetMembersTrpcInput } from '@familytree/backend/src/router/members/getMembers/input'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { useDebounceValue } from 'usehooks-ts'
import { Alert } from '../../../components/Alert'
import { Input } from '../../../components/Input'
import { layoutContentElRef } from '../../../components/Layout'
import { Loader } from '../../../components/Loader'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getViewMemberRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const AllMembersPage = withPageWrapper({
  title: 'Family Tree',
  isTitleExact: true,
})(() => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetMembersTrpcInput.pick({ search: true }),
  })
  const [search] = useDebounceValue(formik.values.search, 500)
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getMembers.useInfiniteQuery(
      {
        search,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title="All Members">
      <div className={css.filter}>
        <Input maxWidth={'100%'} label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].members.length ? (
        <Alert color="brown">Nothing found by search.</Alert>
      ) : (
        <div className={css.members}>
          <InfiniteScroll
            threshold={100}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={css.more} key="loader">
                <Loader type="section" />
              </div>
            }
            getScrollParent={() => layoutContentElRef.current}
            useWindow={(layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'}
          >
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
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
})
