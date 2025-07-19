<<<<<<< HEAD
import styled from '@emotion/styled'
import { KAKAO_LOGIN_URL } from './variables'
import { useLocation } from 'react-router-dom'
import kakaoLogo from '@assets/images/kakao-logo.svg'
import { useMemo } from 'react'
import { ROUTES } from '@routes/ROUTES'

export function KakaoLogin() {
  const location = useLocation() //현재 페이지의 URL 정보를 가져오기

  const beforeLoginUrl: string = location.pathname

  //사용자가 현재 페이지에서 카카오 로그인을 진행하면, 로그인 후 다시 원래 페이지로 돌아갈 수 있도록
  if (!beforeLoginUrl.includes('kakao-login-callback')) {
    //사용자가 로그인하기 전의 페이지 URL을 localStorage에 저장
    localStorage.setItem('before_login_url', beforeLoginUrl)
  }

  // 카카오 로그인 이동 버튼 클릭 핸들러
  const handleKakaoLoginClick = () => {
    window.location.href = KAKAO_LOGIN_URL
  }

  // 카카오 로그인 도중에 카카오 버튼 노출하지 않도록 하는 변수
  const isLoginProcessing = useMemo(() => location.pathname === ROUTES.LOGIN, [location.pathname])

  return (
    <>
      {!isLoginProcessing && (
        <KakaoLoginButton onClick={handleKakaoLoginClick}>
          <KakaoIcon src={kakaoLogo} alt="카카오 로그인 아이콘" />
          카카오 로그인
        </KakaoLoginButton>
      )}
    </>
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

  @media (max-width: 1024px) {
    font-size: 12px;
    font-weight: 500;
    padding: 7px 12px;
    border-radius: 6px;
  }
`
const KakaoIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;

  @media (max-width: 1024px) {
    width: 0.75rem;
    height: 0.75rem;
  }
`
=======
"use client";
import Image from "next/image";
import iconKakaoLogin from "@images/icon-kakaoLogin.svg";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";
import { useMemo, useEffect } from "react";
import { KAKAO_LOGIN_URL } from "@types";
import { routerTypes } from "@api/types/router.types";
// import kakaoLogo from "@assets/images/kakao-logo.svg";

export function KakaoLogin() {
	const pathname = usePathname();

	useEffect(() => {
		// 로그인 콜백 페이지가 아닌 경우에만 저장
		if (
			//SSR 환경(서버)에서는 window가 없으니, 브라우저에서만 실행하도록 조건
			typeof window! == "undefined" &&
			!pathname?.includes("kakao-login-callback")
		) {
			localStorage.setItem("before_login_url", pathname || "/");
		}
	}, [pathname]);

	// 이벤트 핸들러(버튼 클릭 등)는 무조건 브라우저에서 실행되니까 window.location.href 사용해도 됌
	const handleKakaoLoginClick = () => {
		// 로그인 시작 시간 저장
		localStorage.setItem("login_start_time", String(Date.now()));
		window.location.href = KAKAO_LOGIN_URL;
	};

	// 카카오 로그인 도중에 카카오 버튼 노출하지 않도록 하는 변수
	const isLoginProcessing = useMemo(
		() => pathname === routerTypes.LOGIN,
		[pathname]
	);

	return (
		<>
			{!isLoginProcessing && (
				<KakaoLoginButton onClick={handleKakaoLoginClick}>
					<KakaoIcon
						src={iconKakaoLogin}
						alt="카카오 로그인 아이콘"
						width={20} // ✅ 필수
						height={20} // ✅ 필수
					/>
					카카오 로그인
				</KakaoLoginButton>
			)}
		</>
	);
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

	@media (max-width: 1024px) {
		font-size: 12px;
		font-weight: 500;
		padding: 7px 12px;
		border-radius: 6px;
	}
`;
const KakaoIcon = styled(Image)`
	width: 20px;
	height: 20px;
	margin-right: 10px;

	@media (max-width: 1024px) {
		width: 0.75rem;
		height: 0.75rem;
	}
`;
>>>>>>> develop
