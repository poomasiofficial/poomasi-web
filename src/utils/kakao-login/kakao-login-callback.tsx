import { useEffect } from 'react'
import axios from 'axios'
import { REDIRECT_URI, REST_API_KEY } from './variables'
import { RequestApi } from '@api'
import { useNavigate } from 'react-router-dom'

export function KakaoLoginCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams
    const code = params.get('code')
    const grantType = 'authorization_code'

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        { headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' } }
      )
      .then((res: any) => {
        const idToken = res.data.id_token

        try {
          ;(async () => {
            const kakaoLoginResponse = await RequestApi.accounts.postKakaoLogin(idToken)

            localStorage.setItem('account_token', kakaoLoginResponse.account_token)

            window.location.href = 'http://poomasi.me'
          })()
        } catch (error: any) {
          console.log(error)
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  return <></>
}
