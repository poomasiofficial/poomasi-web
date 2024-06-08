"use client";

import { KakaoLogin } from "@utils";
import { accountTokenState } from "@store";
import { useRecoilValue } from "recoil";
import Button from "@mui/material/Button";
import Link from "next/link";
import { LocalStorage } from "@utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

export const Header = () => {
  const accountToken: string | null = useRecoilValue(accountTokenState);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [mounted, setMounted] = useState<boolean>(false);
  const [isLogout, setLogout] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isLogout) {
      window.location.reload();
    }

    return () => {
      setMenuOpen(false);
    };
  }, [isLogout, mounted]);

  const handleLogout = () => {
    LocalStorage.removeItem("public_id");
    LocalStorage.removeItem("account_token");
    setLogout(true);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {isMobile ? (
        <div className="fixed flex items-center justify-center px-[3%] md:px-[5%] w-full h-[50px] bg-white z-50 drop-shadow-md">
          <div className="flex w-[1200px] justify-between leading-10 items-center">
            <nav className="flex md:px-[80px] w-[33%]">
              <Image
                src="/burger.png"
                width={26}
                height={26}
                alt="메뉴"
                onClick={toggleMenu}
                className="cursor-pointer"
              />
            </nav>
            <Link href="/" className="text-4xl cursor-pointer w-[90px] h-[27px] md:w-[135px] md:h-[40px] relative">
              <Image src="/logo.png" alt="로고" fill />
            </Link>
            <div className="w-[33%] flex justify-end">
              {mounted && accountToken ? (
                <Button
                  className="bg-[black] text-[14px] md:text-[19px] text-[#fff]"
                  onClick={handleLogout}
                  sx={{
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
        </div>
      ) : (
        <div className="fixed flex items-center justify-center px-[5%] w-full h-[64px] bg-white z-50 drop-shadow-md">
          <div className="flex w-[1200px] justify-between leading-10 items-center">
            <Link href="/" className="text-4xl cursor-pointer w-[80px] h-[24px] md:w-[135px] md:h-[40px] relative">
              <Image src="/logo.png" alt="로고" fill />
            </Link>
            <nav className="flex flex-1 md:px-[80px] px-[10px]">
              <Link href="/cote-diary" className="text-[1.25rem] font-semibold text-[#4A4A4A]">
                코테일기
              </Link>
            </nav>
            {mounted && accountToken ? (
              <Button
                className="bg-[black]"
                onClick={handleLogout}
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
      )}

      <div
        className={`px-[10px] fixed top-0 left-[-10px] w-[250px] h-full bg-white z-[9999] transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <nav className="flex flex-col p-4">
          <Link
            href="/cote-diary"
            className="py-2 text-[15px] text-[#495057] font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            코테일기
          </Link>
        </nav>
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[9998]" onClick={toggleMenu}></div>
      )}
    </>
  );
};
