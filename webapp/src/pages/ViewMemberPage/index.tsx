import { useParams } from 'react-router-dom'

export const ViewMemberPage = () => {
  const { memberId } = useParams() as { memberId: string }
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
