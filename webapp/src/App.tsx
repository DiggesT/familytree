import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllMembersPage } from './pages/AllMembersPage'
import { EditMemberPage } from './pages/EditMemberPage'
import { NewMemberPage } from './pages/NewMemberPage/'
import { NotFoundPage } from './pages/NotFoundPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { SignUpPage } from './pages/SignUpPage'
import { ViewMemberPage } from './pages/ViewMemberPage'
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
