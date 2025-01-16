import { useParams } from 'react-router-dom'
import { type ViewMemberRouteParams } from '../../lib/routes'

export const ViewMemberPage = () => {
  const { memberId } = useParams() as ViewMemberRouteParams
  return (
    <div>
      <h1>{memberId}</h1>
      <p>Mother</p>
      <div>
        <p>Some text...</p>
        <p>Some text...</p>
        <p>Some text...</p>
      </div>
    </div>
  )
}
