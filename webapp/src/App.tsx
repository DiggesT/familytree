import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAllMembersRoute, getViewMemberRoute } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllMembersPage } from './pages/AllMembersPage'
import { ViewMemberPage } from './pages/ViewMemberPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllMembersRoute()} element={<AllMembersPage />} />
          <Route path={getViewMemberRoute({ memberId: ':memberId' })} element={<ViewMemberPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
