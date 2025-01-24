import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { type ViewMemberRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewMemberPage = () => {
  const { id } = useParams() as ViewMemberRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getMember.useQuery({ id })

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data.member) {
    return <span>Idea not found.</span>
  }

  return (
    <Segment title={`${data.member.lastName} ${data.member.firstName} ${data.member.middleName}`}>
      <div className={css.createdAt}>Created At: {format(data.member.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.createdBy}>Created By: {data.member.creator.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.member.text }} />
    </Segment>
  )
}
