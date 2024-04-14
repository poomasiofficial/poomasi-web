"use client";
import { useEffect } from "react";
import { REDIRECT_URI, REST_API_KEY } from "@utils/kakao-login/variables";
import { RequestApi } from "@api";
import { LocalStorage } from "@utils";
import { useSearchParams } from "next/navigation";

const KakaoLoginCallback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const grantType = "authorization_code";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
          {
            method: "POST",
            headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          const idToken = responseData.id_token;

          try {
            const kakaoLoginResponse = await RequestApi.accounts.postKakaoLogin(idToken);
            if (kakaoLoginResponse) {
              LocalStorage.setItem("public_id", kakaoLoginResponse.public_id);
              LocalStorage.setItem("account_token", kakaoLoginResponse.account_token);
            }
            const beforeLoginUrl: string | null = LocalStorage.getItem("before_login_url");
            LocalStorage.removeItem("before_login_url");
            window.location.href = beforeLoginUrl ? beforeLoginUrl : "https://poomasi.me";
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [code]);

  return <p className="pt-[80px] px-[5%]">Login...</p>;
};

export default KakaoLoginCallback;
