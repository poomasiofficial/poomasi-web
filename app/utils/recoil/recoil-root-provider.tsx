"use client";

import { RecoilRoot } from "recoil";

export const RecoilRootProvider = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
