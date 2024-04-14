import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import "@styles/globals.css";
import "@styles/reset.css";
import { Header } from "@components";
import { RecoilRootProvider } from "@utils";
import { Toast } from "@components";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "대학생 전문 상담 멘토링, 품앗이",
  description: "대학생 전문 상담 멘토링, 품앗이",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <link
        rel="stylesheet"
        as="style"
        crossOrigin="anonymous"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css"
      />

      <body>
        <RecoilRootProvider>
          <Header />
          {children}
          <Toast />
        </RecoilRootProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
