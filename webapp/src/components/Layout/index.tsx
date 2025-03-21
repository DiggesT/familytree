import { createRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg?react'
import { useMe } from '../../lib/ctx'
import * as routes from './../../lib/routes'
import css from './index.module.scss'

export const layoutContentElRef = createRef<HTMLDivElement>()

export const Layout = () => {
  const me = useMe()

  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <Logo className={css.logo} />
        <ul className={css.menu}>
          {me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={routes.getShowTreeRoute.definition}>
                  Show Tree
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={routes.getTreeManagerRoute.definition}>
                  Tree Manager
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={routes.getAllMembersRoute.definition}>
                  All Members
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={routes.getNewMemberRoute.definition}>
                  Add Member
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={routes.getEditProfileRoute.definition}>
                  Edit Profile
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={routes.getSignOutRoute.definition}>
                  Log Out ({me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={routes.getSignUpRoute.definition}>
                  Sign Up
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={routes.getSignInRoute.definition}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  )
}
