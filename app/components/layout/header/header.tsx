"use client";

import { KakaoLogin } from "@utils";
import { accountTokenState } from "@store";
import { useRecoilValue } from "recoil";
import Button from "@mui/material/Button";
import Link from "next/link";
import { LocalStorage } from "@utils";
import { useEffect, useState } from "react";

export const Header = () => {
  const accountToken: string | null = useRecoilValue(accountTokenState);

  const [mounted, setMounted] = useState<boolean>(false);
  const [isLogout, setLogout] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    mounted && window.location.reload();
  }, [isLogout]);

  const handleLogout = () => {
    LocalStorage.removeItem("public_id");
    LocalStorage.removeItem("account_token");
    setLogout(true);
  };

  return (
    <>
      <div className="fixed flex items-center justify-center px-[5%] w-full h-20 bg-white z-50">
        <div className="flex w-[1200px] justify-between leading-10">
          <Link href="/" className="text-4xl cursor-pointer">
            ㉬
          </Link>
          <nav className="flex flex-1 md:px-[80px] px-[10px]">
            <Link href="/cote-diary" className="text-[1.25rem] font-bold">
              코테일기
            </Link>
          </nav>

          {mounted && accountToken ? (
            <Button
              className="bg-[black]"
              onClick={() => handleLogout()}
              sx={{
                fontSize: "19px",
                padding: "3px 20px",
                color: "white",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "var(--gray-color)",
                },
              }}
            >
              로그아웃
            </Button>
          ) : (
            <KakaoLogin />
          )}
        </div>
      </div>
    </>
  );
};
