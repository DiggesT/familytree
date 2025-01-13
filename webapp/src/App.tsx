import { TrpcProvider } from './lib/trpc'
import { AllMembersPage } from './pages/AllMembersPage'

export const App = () => {
  return (
    <TrpcProvider>
      <AllMembersPage />
    </TrpcProvider>
  )
}
