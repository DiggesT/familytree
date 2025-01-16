import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { getAllMembersRoute, getViewMemberRoute, viewMemberRouteParams } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllMembersPage } from './pages/AllMembersPage'
import { ViewMemberPage } from './pages/ViewMemberPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllMembersRoute()} element={<AllMembersPage />} />
            <Route path={getViewMemberRoute(viewMemberRouteParams)} element={<ViewMemberPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
