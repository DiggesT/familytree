import { Link, Outlet } from 'react-router-dom'
import { getAllMembersRoute, getNewMemberRoute, getSignUpRoute } from '../../lib/routes'
import css from './index.module.scss'

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Family Tree</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllMembersRoute()}>
              All Members
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getNewMemberRoute()}>
              Add Member
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getSignUpRoute()}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}
