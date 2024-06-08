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
      <div className="flex-col md:flex-row text-[20px] md:text-3xl text-[#495057] mt-[20px] md:mt-[50px] flex justify-center items-center">
        <div>
          현재,{" "}
          <CountUp start={0} end={accountCount} duration={5}>
            {({ countUpRef }) => <span className=" text-[#199B03]" ref={countUpRef} />}
          </CountUp>
          명과{" "}
          <CountUp start={0} end={qnaCount} duration={5}>
            {({ countUpRef }) => <span className=" text-[#199B03]" ref={countUpRef} />}
          </CountUp>{" "}
          번의
        </div>
        <div className="ml-2">품을 나누었어요 ✨</div>
      </div>
    </div>
  );
}
