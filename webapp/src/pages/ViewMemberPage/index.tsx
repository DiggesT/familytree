import { useParams } from 'react-router-dom'
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
    <div>
      <h1 className={css.title}>{data.member.name}</h1>
      <p className={css.role}>{data.member.role}</p>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.member.text }} />{' '}
    </div>
  )
}
