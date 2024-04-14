"use client";

import { KAKAO_LOGIN_URL } from "./variables";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { LocalStorage } from "@utils";

export function KakaoLogin() {
  const beforeLoginUrl = usePathname();
  useEffect(() => {
    if (!beforeLoginUrl.includes("kakao-login-callback") && !beforeLoginUrl.includes("kakao-login")) {
      LocalStorage.setItem("before_login_url", beforeLoginUrl);
    }
  }, [beforeLoginUrl]);

  return (
    <Link href={KAKAO_LOGIN_URL}>
      <button className="h-[40px] flex items-center justify-center px-5 py-2 bg-[#fee500] hover:bg-[#ffeb3b] text-black rounded-lg font-bold text-[16px] md:text-lg cursor-pointer">
        <Image src="/kakao-login-icon.png" alt="카카오 로그인 아이콘" className="w-5 h-5 mr-2" width="20" height="20" />
        카카오 로그인
      </button>
    </Link>
  );
}
