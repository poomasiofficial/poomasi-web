<<<<<<< HEAD
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { AccountType } from '@utils/api/enums'

type AccessTokenStore = {
  accessToken: string | null
  setaccessToken: (token: string) => void
  publicId: string | null
  setPublicId: (id: string) => void
  resetaccessToken: () => void
  // 추가
  accountType: AccountType.MENTOR | AccountType.USER | AccountType.STAFF | null
  setAccountType: (type: AccountType.MENTOR | AccountType.USER | AccountType.STAFF) => void
  nickname: string | null
  setNickname: (nickname: string) => void
}

export const useAccountStore = create<AccessTokenStore>()(
=======
"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AccountType } from "@types";

type AccessTokenStore = {
  accessToken: string | null;
  setaccessToken: (token: string) => void;
  publicId: string | null;
  setPublicId: (id: string) => void;
  resetaccessToken: () => void;
  // 추가
  accountType: AccountType.MENTOR | AccountType.USER | AccountType.STAFF | null;
  setAccountType: (
    type: AccountType.MENTOR | AccountType.USER | AccountType.STAFF,
  ) => void;
  nickname: string | null;
  setNickname: (nickname: string) => void;
};

export const useAccountStore = create<AccessTokenStore>()(
  //persist: 상태들을 localStorage에 자동 저장함.
  //set: Zustand에서 상태를 업데이트 할 때 쓰는 함수
>>>>>>> develop
  persist(
    (set) => ({
      accessToken: null,
      publicId: null,
      accountType: null,
      nickname: null, // 초기값
      setaccessToken: (token) => set({ accessToken: token }),
      setPublicId: (id) => set({ publicId: id }),
      setAccountType: (type) => set({ accountType: type }),
      setNickname: (nickname) => set({ nickname }),
      // 함수 추가
      resetaccessToken: () => {
        set({
          accessToken: null,
          publicId: null,
          accountType: null,
          nickname: null,
<<<<<<< HEAD
        })
      },
    }),
    {
      name: 'account-token-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

/*
✅ account_token을 어떻게 활용할 수 있을까?
단순히 localStorage에 저장하는 것만으로 끝나는 게 아니라, API 호출 시 인증(Authorization)에 사용할 수 있다!
=======
        });
      },
    }),
    {
      name: "account-token-storage", //localStorage에 저장할 때 사용할 key 이름
      storage: createJSONStorage(() => localStorage), //객체를 JSON 문자열로 바꿔서 저장해서 localStorage에 저장
      // onRehydrateStorage 추가
    },
  ),
);

/* 토큰값 흐름
1. 카카오 로그인 
2. 카카오 API에서 access_token을 받아옴 
3. 그 값을 setaccessToken(token)으로 Zustand에 저장
4. Zustand가 persist 옵션 때문에 자동으로 localStorage에도 저장!
>>>>>>> develop
*/
