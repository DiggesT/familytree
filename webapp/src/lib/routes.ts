const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllMembersRoute = () => '/'

export const viewMemberRouteParams = getRouteParams({ memberId: true })
export type ViewMemberRouteParams = typeof viewMemberRouteParams
export const getViewMemberRoute = ({ memberId }: ViewMemberRouteParams) => `/members/${memberId}`
