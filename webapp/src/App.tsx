import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { AllMembersPage } from './pages/members/AllMembersPage'
import { EditMemberPage } from './pages/members/EditMemberPage'
import { NewMemberPage } from './pages/members/NewMemberPage/'
import { ViewMemberPage } from './pages/members/ViewMemberPage'
import { NotFoundPage } from './pages/other/NotFoundPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getAllMembersRoute()} element={<AllMembersPage />} />
              <Route path={routes.getNewMemberRoute()} element={<NewMemberPage />} />
              <Route path={routes.getViewMemberRoute(routes.viewMemberRouteParams)} element={<ViewMemberPage />} />
              <Route path={routes.getEditMemberRoute(routes.editMemberRouteParams)} element={<EditMemberPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
