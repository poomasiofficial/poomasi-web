"use client";

import { DescriptionSection, FooterSection, PeopleSection, TitleSection } from "@page";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 767px)"); // Adjust the breakpoint as needed
  const paddingTop = isMobile ? "pt-[50px]" : "pt-[64px]";
  const bannerSrc = isMobile ? "/banner1_m.png" : "/banner1.png";
  return (
    <div>
      <div className={`w-full ${paddingTop}`}>
        <Image
          src={bannerSrc}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt="배너"
        />

        <div className="flex items-center justify-center w-full px-[5%]">
          <div className="w-[1200px] mb-10">
            <DescriptionSection />
          </div>
        </div>

        <div className="flex items-center justify-center w-full px-[5%]">
          <div className="w-[1200px] mb-10">
            <PeopleSection />
          </div>
        </div>

        <div className="flex items-center justify-center w-full px-[5%]">
          <div className="w-[1200px] mb-10">
            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  );
}
