import { Link, Outlet } from 'react-router-dom'
import { getAllMembersRoute } from '../../lib/routes'

export const Layout = () => {
  return (
    <div>
      <p>
        <b>Family Tree</b>
      </p>
      <ul>
        <li>
          <Link to={getAllMembersRoute()}>All Members</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
