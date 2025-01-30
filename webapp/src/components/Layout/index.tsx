import { Link, Outlet } from 'react-router-dom'
import { useMe } from '../../lib/ctx'
import {
  getAllMembersRoute,
  getEditProfileRoute,
  getNewMemberRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from '../../lib/routes'
import css from './index.module.scss'

export const Layout = () => {
  const me = useMe()

  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Family Tree</div>
        <ul className={css.menu}>
          {me ? (
            <>
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
                <Link className={css.link} to={getEditProfileRoute()}>
                  Edit Profile
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignOutRoute()}>
                  Log Out ({me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getSignUpRoute()}>
                  Sign Up
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignInRoute()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}
