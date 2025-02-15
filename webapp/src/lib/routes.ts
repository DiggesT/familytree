import { pgr } from '../utils/pumpGetRoute'

export const getAllMembersRoute = pgr(() => '/')

export const getSignInRoute = pgr(() => '/sign-in')

export const getSignUpRoute = pgr(() => '/sign-up')

export const getSignOutRoute = pgr(() => '/sign-out')

export const getEditProfileRoute = pgr(() => '/edit-profile')

export const getShowTreeRoute = pgr(() => '/tree/show')

export const getNewTreeRoute = pgr(() => '/tree/new')

export const getNewMemberRoute = pgr(() => '/members/new')

export const getViewMemberRoute = pgr({ memberId: true }, ({ memberId }) => `/members/${memberId}`)

export const getEditMemberRoute = pgr({ memberId: true }, ({ memberId }) => `/members/${memberId}/edit`)
