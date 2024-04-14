"use client";

import { RequestApi } from "@api";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

export function DescriptionSection() {
  const [accountCount, setAccountCount] = useState(84);
  const [qnaCount, setQnaCount] = useState(37);

  useEffect(() => {
    (async () => {
      try {
        const qnaStatus = await RequestApi.posts.getQnaStatus();
        console.log(qnaStatus);
        if (qnaStatus) {
          setQnaCount(qnaStatus.qna_count);
          setAccountCount(qnaStatus.account_count);
        } else {
          console.error("Q&A status is null");
        }
      } catch (error: any) {
        setAccountCount(85);
        setQnaCount(37);
      }
    })();
  }, []);

  return (
    <div className="w-full">
      <div className="h-1 w-[30px] bg-[black] mt-[7px] mb-4"></div>
      <div className="text-[25px] md:text-3xl mb-[13px]">소개</div>
      <div className="leading-[1.6] text-[15px] md:text-[17px]">
        품앗이에는 다양한 직군의 현업 개발자들이 있습니다. <br />
        저희는 삼인행필유아사(三人行必有我師)를 바탕으로, <br />
        누구에게나 배울점이 있다는 믿음하에 저희가 가진 경험을 <br />
        서로 전파하고 멘토링을 진행하고 있습니다. <br />각 분야의 품앗이꾼들에게 도움을 받아보세요 :) <br />
        <br /> 👉 이용 방법 : 로그인 후 도움받고 싶은 품앗이꾼에게 질문 작성
      </div>

      <div className="flex-col md:flex-row text-[28px] md:text-4xl text-gray-500 mt-[50px] flex justify-center items-center">
        <div>
          현재,{" "}
          <CountUp start={0} end={accountCount} duration={5}>
            {({ countUpRef }) => <span className="font-bold text-[#6cb11a]" ref={countUpRef} />}
          </CountUp>
          명과{" "}
          <CountUp start={0} end={qnaCount} duration={5}>
            {({ countUpRef }) => <span className="font-bold text-[#6cb11a]" ref={countUpRef} />}
          </CountUp>{" "}
          번의
        </div>
        <div className="ml-2">품을 나누었어요. 🌱</div>
      </div>
    </div>
  );
}
