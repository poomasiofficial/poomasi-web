import { Layout } from '@components'
import { DetailPage, LandingPage } from '@pages'
import { KakaoLoginCallback, PageviewTracker } from '@utils'
import { Route, Routes } from 'react-router-dom'

export function PublicRoute() {
  // GA pageview tracker
  PageviewTracker()

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<LandingPage />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="/kakao-login-callback" element={<KakaoLoginCallback />} />
      </Route>
    </Routes>
  )
}
