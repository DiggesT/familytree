import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { NotAuthRouteTracker } from './components/NotAuthRouteTracker'
import { AppContextProvider } from './lib/ctx'
import { MixpanelUser } from './lib/mixpanel'
import * as routes from './lib/routes'
import { SentryUser } from './lib/sentry'
import { TrpcProvider } from './lib/trpc'
import { EditProfilePage } from './pages/auth/EditProfilePage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { AllMembersPage } from './pages/members/AllMembersPage'
import { EditMemberPage } from './pages/members/EditMemberPage'
import { NewMemberPage } from './pages/members/NewMemberPage/'
import { ViewMemberPage } from './pages/members/ViewMemberPage'
import { AboutPage } from './pages/other/AboutPage'
import { NotFoundPage } from './pages/other/NotFoundPage'
import { ShowTreePage } from './pages/tree/ShowTreePage'
import { TreeManagerPage } from './pages/tree/TreeManagerPage'
import './styles/global.scss'

export const App = () => {
  return (
    <HelmetProvider>
      <TrpcProvider>
        <AppContextProvider>
          <BrowserRouter>
            <SentryUser />
            <MixpanelUser />
            <NotAuthRouteTracker />
            <Routes>
              <Route path={routes.getSignOutRoute.definition} element={<SignOutPage />} />
              <Route element={<Layout />}>
                <Route path={routes.getSignUpRoute.definition} element={<SignUpPage />} />
                <Route path={routes.getSignInRoute.definition} element={<SignInPage />} />
                <Route path={routes.getAbout.definition} element={<AboutPage />} />
                <Route path={routes.getShowTreeRoute.definition} element={<ShowTreePage />} />
                <Route path={routes.getTreeManagerRoute.definition} element={<TreeManagerPage />} />
                <Route path={routes.getAllMembersRoute.definition} element={<AllMembersPage />} />
                <Route path={routes.getNewMemberRoute.definition} element={<NewMemberPage />} />
                <Route path={routes.getEditProfileRoute.definition} element={<EditProfilePage />} />
                <Route path={routes.getViewMemberRoute.definition} element={<ViewMemberPage />} />
                <Route path={routes.getEditMemberRoute.definition} element={<EditMemberPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  )
}
