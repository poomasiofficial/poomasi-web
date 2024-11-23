import { BrowserRouter } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { accountTokenState } from '@store'
import { PrivateRoute } from './private-route'
import { PublicRoute } from './public-route'

export function Router() {
  const accountToken: string | null = useRecoilValue(accountTokenState)

  return <BrowserRouter basename={process.env.PUBLIC_URL}>{accountToken ? <PublicRoute /> : <PublicRoute />}</BrowserRouter>
}
