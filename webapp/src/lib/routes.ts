const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllMembersRoute = () => '/'

export const viewMemberRouteParams = getRouteParams({ memberId: true })
export type ViewMemberRouteParams = typeof viewMemberRouteParams
export const getViewMemberRoute = ({ memberId }: ViewMemberRouteParams) => `/members/${memberId}`

export const editMemberRouteParams = getRouteParams({ memberId: true })
export type EditMemberRouteParams = typeof editMemberRouteParams
export const getEditMemberRoute = ({ memberId }: EditMemberRouteParams) => `/members/${memberId}/edit`

export const getNewMemberRoute = () => '/members/new'

export const getSignUpRoute = () => '/sign-up'

export const getSignInRoute = () => '/sign-in'

export const getSignOutRoute = () => '/sign-out'
