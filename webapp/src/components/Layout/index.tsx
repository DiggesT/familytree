import { Link, Outlet } from 'react-router-dom'
import {
  getAllMembersRoute,
  getNewMemberRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery()

  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Family Tree</div>
        <ul className={css.menu}>
          {isLoading || isFetching || isError ? null : data.me ? (
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
                <Link className={css.link} to={getSignOutRoute()}>
                  Log Out ({data.me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              {' '}
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
