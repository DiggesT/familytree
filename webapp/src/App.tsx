import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllMembersPage } from './pages/AllMembersPage'
import { NewMemberPage } from './pages/NewMemberPage/'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { ViewMemberPage } from './pages/ViewMemberPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getSignInRoute()} element={<SignInPage />} />
            <Route path={routes.getAllMembersRoute()} element={<AllMembersPage />} />
            <Route path={routes.getNewMemberRoute()} element={<NewMemberPage />} />
            <Route path={routes.getViewMemberRoute(routes.viewMemberRouteParams)} element={<ViewMemberPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
