import styled from '@emotion/styled'

import { Outlet } from 'react-router-dom'

interface HeaderProps {
  children?: React.ReactElement
}

export function Header({ children }: HeaderProps) {
  const toHome = () => {
    window.location.href = 'https://poomasi.github.io/'
  }

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <div onClick={toHome} style={{ fontSize: '40px', cursor: 'pointer' }}>
            ㉬
          </div>

          <StyledButton>
            <KakaoIcon src="/assets/kakao-login-icon.png" alt="카카오 로그인 아이콘" />
            카카오 로그인
          </StyledButton>
        </HeaderContent>
      </HeaderContainer>

      {children || <Outlet />}
    </>
  )
}

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 5% 0 5%;
  width: 100%;
  height: 80px;
  background-color: white;

  z-index: 999;
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
`

const StyledButton = styled.button`
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
