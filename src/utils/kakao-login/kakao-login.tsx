import styled from '@emotion/styled'
import { KAKAO_LOGIN_URL } from './variables'

export function KakaoLogin() {
  return (
    <KakaoLoginButton onClick={() => (window.location.href = KAKAO_LOGIN_URL)}>
      <KakaoIcon src="/assets/kakao-login-icon.png" alt="카카오 로그인 아이콘" />
      카카오 로그인
    </KakaoLoginButton>
  )
}

const KakaoLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #fee500;
  color: #000;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #ffeb3b;
  }
`
const KakaoIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`
