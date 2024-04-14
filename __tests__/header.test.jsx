import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Header } from "../app/components/layout/header";
import { accountTokenState } from "@store";
import { RecoilRoot } from "recoil";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

jest.mock("next/navigation", () => ({
  usePathname() {
    return "";
  },
}));
describe("헤더", () => {
  it("로그인 전 : 카카오 로그인 버튼 렌더링", () => {
    render(
      <RecoilRoot>
        <Header />
      </RecoilRoot>
    );

    const loginButton = screen.getByRole("button", { name: /카카오 로그인/i });
    expect(loginButton).toBeInTheDocument();
  });

  it("로그인 후 : 로그아웃 버튼 렌더링", () => {
    localStorage.setItem("account_token", "xxx");

    render(
      <RecoilRoot>
        <Header />
      </RecoilRoot>
    );

    const logoutButton = screen.getByRole("button", { name: /로그아웃/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it("로그인 버튼 작동 확인");
  it("로그아웃 버튼 작동 확인");
  it("로그인 버튼 클릭 시 작동 확인");
});
