import styled from '@emotion/styled'
import { KakaoLogin } from '@utils'

import { Outlet } from 'react-router-dom'
import { accountTokenState } from '@store'
import { useRecoilValue } from 'recoil'
import Button from '@mui/material/Button'

interface HeaderProps {
  children?: React.ReactElement
}

export function Header({ children }: HeaderProps) {
  const accountToken: string | null = useRecoilValue(accountTokenState)

  const toHome = () => {
    window.location.href = '/'
  }

  const handleLogout = () => {
    localStorage.removeItem('account_token')
    window.location.reload()
  }

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <div onClick={toHome} style={{ fontSize: '40px', cursor: 'pointer' }}>
            ㉬
          </div>

          {accountToken ? (
            <Button
              onClick={() => handleLogout()}
              sx={{
                fontSize: '19px',
                padding: '3px 20px',
                color: 'white',
                backgroundColor: 'black',
                '&:hover': {
                  backgroundColor: 'var(--gray-color)',
                },
              }}
            >
              로그아웃
            </Button>
          ) : (
            <KakaoLogin />
          )}
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
